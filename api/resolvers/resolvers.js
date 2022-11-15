const { UserInputError, AuthenticationError } = require("apollo-server-core")
const { GraphQLScalarType, Kind, KnownArgumentNamesRule } = require("graphql")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { nanoid } = require("nanoid/async")
const User = require("../models/user")
const Drop = require("../models/drop")
const Tag = require("../models/gear/tag")
const { GearList, GearListItem } = require("../models/gear/list")
const GearItem = require("../models/gear/item")
const GearImage = require("../models/gear/image")
const config = require("../utils/config")
const logger = require("../utils/logger")
const { checkAuth, checkDropPermissions } = require("../utils/auth")
const { handleTags } = require("../utils/tags")
const { GearPref, GearPrefOpt } = require("../models/gear/pref")
const {
  handlePrefs,
  handleEditPrefs,
  createNewPref,
} = require("../utils/prefs")
const { generateUploadURL, deleteS3Object } = require("../utils/s3")
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date scalar type",
  serialize(value) {
    return value.getTime()
  },
  parseValue(value) {
    return new Date(value)
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10))
    }
    return null
  },
})

const resolvers = {
  Date: dateScalar,
  User: {
    drops: async (root, args, context, info) => {
      const { currentUser } = context
      const userDrops = await Drop.find({ users: currentUser }).populate(
        "users"
      ) // ToDo: revisit popluating users in drop rather?
      return userDrops
    },
  },
  GearItem: {
    allPrefs: async (root, args, context) => {
      const gearItemPrefs = await GearPref.find({
        gearItem: root,
      }).populate("allOpts")

      return gearItemPrefs
    },
    //Populates tags/images if they're queried
    tags: async (root, args, context) => {
      const gearItemWithTags = await root.populate("tags")
      return gearItemWithTags.tags
    },
    images: async (root, args, context) => {
      const gearItemWithImages = await root.populate("images")
      return gearItemWithImages.images
    },
  },

  GearList: {
    drop: async (root, args, context) => {
      const drop = await Drop.findById(root.drop)
      return drop
    },
  },
  GearListItem: {
    gearItem: async (root, args, context) => {
      const gearItem = await GearItem.findById(root.gearItem)
      return gearItem
    },
  },
  GearListGearPref: {
    pref: async (root, args, context) => {
      const pref = await GearPref.findById(root.pref)
      return pref
    },
    opts: async (root, args, context) => {
      const opts = await GearPrefOpt.find({
        _id: { $in: root.opts },
      })
      return opts
    },
  },
  Mutation: {
    addTag: async (root, args, context) => {
      //specifically for generic tags (ie !category), otherwise tags
      // are generated via the handleTags helper
      checkAuth(context)
      const { name } = args
      const existingTag = await Tag.findOne({ name: name.toLowerCase() })
      if (existingTag) {
        throw new UserInputError("Tag already exists")
      }
      const newTag = new Tag({
        name: name.toLowerCase(),
      })
      return await newTag.save()
    },
    addGearItem: async (root, args, context) => {
      checkAuth(context)
      const {
        category,
        manufacturer,
        model,
        description,
        images,
        productURL,
        tags,
        prefs,
      } = args
      const tagObjects = tags ? await handleTags(tags, category) : []
      const newGearItem = new GearItem({
        category,
        manufacturer,
        model,
        description,
        images,
        productURL,
        tags: tagObjects,
      })
      if (prefs) {
        await handlePrefs(prefs, newGearItem)
      }
      return await newGearItem.save()
    },
    editGearItem: async (root, args, context) => {
      checkAuth(context)
      try {
        const {
          category,
          manufacturer,
          model,
          description,
          images,
          productURL,
          tags,
          prefs,
        } = args
        //ToDo: relook using name as tag ref on mutation
        const tagObjects = tags ? await handleTags(tags, category) : undefined
        if (prefs) {
          await handleEditPrefs(prefs, mongoose.Types.ObjectId(args.id))
        }
        return await GearItem.findByIdAndUpdate(
          args.id,
          {
            category,
            manufacturer,
            model,
            description,
            images,
            productURL,
            tags: tagObjects,
          },
          {
            returnDocument: "after",
          }
        )
          .populate("tags")
          .populate("images")
      } catch (e) {
        throw new UserInputError("Editing Gear Item failed with error: " + e)
      }
    },
    addGearPref: async (root, args, context) => {
      checkAuth(context)
      const newPref = new GearPref({
        gearItem: args.gearItem,
      })
      return await newPref.save()
    },
    editGearPref: async (root, args, context) => {
      checkAuth(context)
      //To edit gear pref name only.
      //use addGearPrefOpt to add new opts
      try {
        return await GearPref.findByIdAndUpdate(
          args.id,
          {
            name: args.name,
          },
          { returnDocument: "after" }
        )
      } catch (e) {
        throw new UserInputError(e)
      }
    },
    removeGearPref: async (root, args, context) => {
      checkAuth(context)
      try {
        const prefToDelete = await GearPref.findById(args.id)
        await GearPrefOpt.deleteMany({ _id: { $in: prefToDelete.opts } })
        await prefToDelete.delete()
        return prefToDelete.id
      } catch (e) {
        throw new UserInputError(e)
      }
    },

    addGearPrefOpt: async (root, args, context) => {
      checkAuth(context)
      try {
        //Create a new gearPrefOpt
        //append it to allOpts in pref
        //returns new pref to update UI
        const newGearPrefOpt = new GearPrefOpt({
          name: "",
        })
        await newGearPrefOpt.save()
        return await GearPref.findByIdAndUpdate(
          args.gearPref,
          {
            $push: {
              allOpts: newGearPrefOpt,
            },
          },
          { returnDocument: "after" }
        ).populate("allOpts")
      } catch (e) {
        throw new UserInputError(e)
      }
    },
    editGearPrefOpt: async (root, args, context) => {
      checkAuth(context)
      try {
        // names have been made not unique
        // to prevent collision here and prevent
        // weird issues with other gearPref's with
        // the same opts changing opts names
        //ToDo: rethink the sharing of gear pref opt name values
        // or just drop this comment and allow for duplicates
        return await GearPrefOpt.findByIdAndUpdate(
          args.id,
          {
            name: args.name,
          },
          { returnDocument: "after" }
        )
      } catch (e) {
        throw new UserInputError(e)
      }
    },
    removeGearPrefOpt: async (root, args, context) => {
      checkAuth(context)
      try {
        //removes opt and reutrns new GearPref
        //ToDo: handle issue with
        await GearPrefOpt.findByIdAndDelete(args.id)
        return await GearPref.findByIdAndUpdate(
          args.gearPref,
          {
            $pull: {
              allOpts: args.id,
            },
          },
          { returnDocument: "after" }
        ).populate("allOpts")
      } catch (e) {
        throw new UserInputError(e)
      }
    },
    addGearImage: async (root, args, context) => {
      checkAuth(context)
      //ToDo: potential thmb url
      const newGearImage = new GearImage({
        url: args.url,
        // ToDo: relook fetching w/h from DOM
        // for now just using 2MP/1080p size
        // as per makeWEBP args on fe
        width: args.width ? args.width : null,
        height: args.height ? args.width : null,
      })
      await GearItem.findByIdAndUpdate(args.gearItem, {
        $push: {
          images: newGearImage,
        },
      })
      return await newGearImage.save()
    },
    removeGearImage: async (root, args, context) => {
      checkAuth(context)
      const gearImage = await GearImage.findById(args.id)
      if (!gearImage) {
        throw new UserInputError("Gear image does not exist")
      }
      await deleteS3Object(
        `gear/${args.gearItem}`,
        gearImage.url.split("/").at(-1)
      )
      await GearItem.findByIdAndUpdate(args.gearItem, {
        $pull: {
          images: args.id,
        },
      })
      await gearImage.delete()

      return gearImage.id
    },
    addDrop: async (root, args, context) => {
      checkAuth(context)
      const { currentUser } = context
      const drop = new Drop({
        ...args,
        users: [currentUser],
      })

      await drop.populate("users")
      return await drop.save()
    },

    updateDrop: async (root, args, context) => {
      checkAuth(context)
      const drop = await Drop.findById(args.id)
      checkDropPermissions(context, drop)
      const existingDrop = await Drop.findByIdAndUpdate(
        args.id,
        {
          ...args,
        },
        { returnDocument: "after" }
      )
        .populate("users")
        .populate("lists")
      return existingDrop
    },

    removeDrop: async (root, args, context) => {
      checkAuth(context)
      const { currentUser } = context
      const drop = await Drop.findById(args.drop)
      if (!drop) {
        throw new UserInputError("Drop not found")
      }
      //change to includes method?
      const canRemove = drop.users.find(
        (user) => user._id.toString() === currentUser._id.toString()
      )
      if (!canRemove) {
        throw new AuthenticationError("User not authorized to delete")
      }
      try {
        await Drop.findByIdAndDelete(args.drop)
        //ToDo: delete attached lists
      } catch (e) {
        throw new UserInputError("Delete error:", e)
      }
      return true
    },

    addList: async (root, args, context) => {
      checkAuth(context)
      const existingDrop = await Drop.findById(args.drop)
      checkDropPermissions(context, existingDrop)
      const { category, comment } = args

      const newGearList = new GearList({
        category,
        comment,
        drop: existingDrop, //List page
      })

      existingDrop.lists.push(newGearList)
      await existingDrop.save()

      return await newGearList.save()
    },

    editList: async (root, args, context) => {
      checkAuth(context)
      const existingGearList = await GearList.findById(args.id)
      if (!existingGearList) {
        throw new UserInputError("List does not exist")
      }
      const parentDrop = await Drop.findOne({ lists: existingGearList })
      checkDropPermissions(context, parentDrop)
      const { comment } = args
      const newList = await GearList.findByIdAndUpdate(
        args.id,
        {
          comment,
        },
        { returnDocument: "after" }
      )
      return newList
    },

    removeList: async (root, args, context) => {
      checkAuth(context)
      const listToDelete = await GearList.findById(args.id)
      if (!listToDelete) {
        throw new UserInputError("List does not exist")
      }
      const parentDrop = await Drop.findOne({ lists: listToDelete })
      checkDropPermissions(context, parentDrop)
      try {
        parentDrop.lists = parentDrop.lists.filter(
          (list) => list !== listToDelete
        )
        await parentDrop.save()
        await listToDelete.delete()
        return true
      } catch (e) {
        throw new UserInputError(
          "Failed to remove list with error: ",
          e.message
        )
      }
    },

    addListItem: async (root, args, context) => {
      checkAuth(context)
      const listToAdd = await GearList.findById(args.list)
      if (!listToAdd) {
        throw new UserInputError("List does not exist")
      }
      const parentDrop = await Drop.findOne({ lists: listToAdd })
      checkDropPermissions(context, parentDrop)
      const { gearItem, quantity, prefs, comment } = args
      const newGearListItem = new GearListItem({
        gearItem,
        quantity,
        comment,
        gearList: listToAdd,
        userThatUpdated: context.currentUser,
        prefs: prefs
          ? prefs.map((pref) => {
              return {
                pref: mongoose.Types.ObjectId(pref.id),
                opts: pref.opts.map((opt) => mongoose.Types.ObjectId(opt)),
              }
            })
          : null,
      })
      return await newGearListItem.save()
    },

    editListItem: async (root, args, context) => {
      checkAuth(context)
      const listToEdit = await GearList.findById(args.list)
      if (!listToEdit) {
        throw new UserInputError("List does not exist")
      }
      const parentDrop = await Drop.findOne({ lists: listToEdit })
      checkDropPermissions(context, parentDrop)
      const { quantity, prefs, comment } = args
      try {
        listToEdit.items.id(args.id).userThatUpdated = context.currentUser
        if (quantity) {
          listToEdit.items.id(args.id).quantity = quantity
        }
        if (comment) {
          listToEdit.items.id(args.id).comment = comment
        }
        if (prefs) {
          listToEdit.items.id(args.id).prefs = prefs.map((pref) => {
            return {
              pref: mongoose.Types.ObjectId(pref.id),
              opts: pref.opts.map((opt) => mongoose.Types.ObjectId(opt)),
            }
          })
        }
      } catch {
        throw new UserInputError("List item does not exist")
      }
      return await listToEdit.save()
    },

    removeListItem: async (root, args, context) => {
      checkAuth(context)
      const listToEdit = await GearList.findById(args.list)
      if (!listToEdit) {
        throw new UserInputError("List does not exist")
      }
      const parentDrop = await Drop.findOne({ lists: listToEdit })
      checkDropPermissions(context, parentDrop)
      try {
        listToEdit.items.id(args.id).remove()
      } catch {
        throw new UserInputError("List item does not exist")
      }
      return await listToEdit.save()
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(args.password, user.passwordHash)
      if (!passwordCorrect) {
        throw new UserInputError("Incorrect password")
      }
      const userForToken = {
        id: user._id,
        username: user.username,
      }
      return {
        value: jwt.sign(userForToken, config.SECRET, {
          expiresIn: 60 * 60 * 3,
        }),
      }
    },

    createUser: async (root, args) => {
      const existingUser = await User.findOne({ username: args.username })
      if (existingUser) {
        return new UserInputError("Username already exists")
      }
      const passwordHash = await bcrypt.hash(args.password, 10)
      const newUser = new User({
        username: args.username,
        passwordHash,
        profilePicture: args.profilePicture,
        fullName: args.fullName,
      })
      try {
        return newUser.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
    },

    editMe: async (root, args, context) => {
      checkAuth(context)
      const { currentUser } = context
      if (args.username) {
        currentUser.username = args.username
      }
      if (args.password) {
        currentUser.passwordHash = await bcrypt.hash(args.password, 10)
      }
      if (args.profilePicture) {
        currentUser.profilePicture = args.profilePicture
      }
      if (args.fullName) {
        currentUser.fullName = args.fullName
      }
      try {
        return await currentUser.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
    },
  },
  Query: {
    me: async (root, args, context) => {
      const { currentUser } = context
      return currentUser
    },
    getProfileImageUpload: async (root, args, context) => {
      checkAuth(context)
      const { currentUser } = context
      return await generateUploadURL("users", `${currentUser.id}.webp`)
    },
    getGearImageUpload: async (root, args, context) => {
      checkAuth(context)
      const gearImgUrlId = await nanoid(10)
      return await generateUploadURL(
        `gear/${args.gearItem}`,
        `${gearImgUrlId}.webp`
      )
    },

    allDrops: async (root, args, context) => {
      if (args.drop) {
        try {
          const drop = await Drop.findById(args.drop)
            .populate("users")
            .populate("lists")
          // console.log(drop.lists[0].items)
          return [drop]
        } catch (e) {
          throw new UserInputError("Error finding drop", {
            error: e,
          })
        }
      }

      if (!process.env.NODE_ENV === "development") {
        //placeholder to protect all drops on prod
        throw new AuthenticationError("Unauthoized")
      }
      const drops = await Drop.find({}).populate("users")

      return drops
    },

    getList: async (root, args, context) => {
      //ToDo: Potential pagination on GearListItem
      try {
        return await GearList.findById(args.id)
      } catch (e) {
        throw new UserInputError("Error finding list", {
          error: e,
        })
      }
    },

    getListItems: async (root, args, context) => {
      try {
        const searchTerms = {}
        searchTerms.gearList = args.list

        let options = {
          // populate: ["tags", "images"],
        }

        if (args.limit) {
          options.limit = args.limit
        } else {
          options.limit = 16
        }
        if (args.offset) {
          options.offset = args.offset
        }
        //Sort by most recently added

        options.sort = { _id: -1 }
        const paginatedResults = await GearListItem.paginate(
          searchTerms,
          options
        )

        // if (args.tags) {
        //   searchTerms.gearItem = { tags: { $all: args.tags } }
        // }

        const { totalDocs, totalPages, page, prevPage, nextPage } =
          paginatedResults
        return {
          gearListItems: paginatedResults.docs,
          totalDocs,
          totalPages,
          page,
          prevPage,
          nextPage,
        }
      } catch (e) {
        throw new UserInputError(`Error searching: ${e}`)
      }
    },

    allTags: async (root, args, context) => {
      try {
        // if 'tags' array param, return all tags
        // in that array in order of request array
        // using mongodb aggregation pipeline
        if (args.tags) {
          const tags = args.tags.map((tag) => mongoose.Types.ObjectId(tag))
          const res = await Tag.aggregate([
            {
              $match: {
                _id: {
                  $in: tags,
                },
              },
            },
            {
              $addFields: {
                __order: {
                  $indexOfArray: [tags, "$_id"],
                },
              },
            },
            { $sort: { __order: 1 } },
            {
              $project: {
                _id: 0,
                id: "$_id",
                name: 1,
                category: 1,
                __order: 1,
              },
            },
          ])
          return res
        }
        let findParams = {}
        if (args.tag) {
          findParams = {
            ...findParams,
            name: { $regex: args.tag, $options: "i" },
          }
        }
        if (args.category) {
          findParams = {
            ...findParams,
            //look for any tags in category array
            //as well as empty tag.category and !tag.category
            $or: [
              { category: { $in: args.category } },
              { category: { $size: 0 } },
              { category: null },
            ],
          }
        }
        const tagSearch = await Tag.find(findParams).sort("name").limit(20)
        return tagSearch
      } catch {
        throw new UserInputError(`Error searching for tag: ${args.tag}`)
      }
    },

    allGearItems: async (root, args, context) => {
      if (args.id) {
        //skip pagination if single item
        //pagination values will return null
        const gearItem = await GearItem.findById(args.id)
        // .populate("tags")
        // .populate("images")
        return { gearItems: [gearItem] }
      }
      try {
        const searchTerms = {}
        if (args.manufacturer) {
          searchTerms.manufacturer = {
            $regex: args.manufacturer,
            $options: "i",
          }
        }
        if (args.model) {
          searchTerms.model = { $regex: args.model, $options: "i" }
        }
        if (args.category) {
          searchTerms.category = { $in: [args.category] }
        }
        if (args.tags) {
          searchTerms.tags = { $all: args.tags }
        }
        let options = {
          // populate: ["tags", "images"],
        }
        if (args.limit) {
          options.limit = args.limit
        } else {
          options.limit = 16
        }
        if (args.offset) {
          options.offset = args.offset
        }
        //Sort by most recently added
        options.sort = { _id: -1 }
        const paginatedResults = await GearItem.paginate(searchTerms, options)
        const { totalDocs, totalPages, page, prevPage, nextPage } =
          paginatedResults
        return {
          gearItems: paginatedResults.docs,
          totalDocs,
          totalPages,
          page,
          prevPage,
          nextPage,
        }
      } catch (e) {
        throw new UserInputError(`Error searching: ${e}`)
      }
    },

    allUsers: async (root, args, context) => {
      checkAuth(context)
      if (args.fullName) {
        return await User.find({
          fullName: { $regex: args.fullName, $options: "i" },
        })
      } // Implement $search later on if we stick to Atlas
      return User.find({})
    },
  },
}

module.exports = resolvers
