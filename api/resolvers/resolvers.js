const { UserInputError, AuthenticationError } = require("apollo-server-core")
const { GraphQLScalarType, Kind } = require("graphql")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const Drop = require("../models/drop")
const Tag = require("../models/gear/tag")
const GearList = require("../models/gear/list")
const GearItem = require("../models/gear/item")
const config = require("../utils/config")
const logger = require("../utils/logger")
const { checkAuth, checkDropPermissions } = require("../utils/auth")
const { handleTags } = require("../utils/tags")
const { GearPref, GearPrefOpt } = require("../models/gear/pref")
const { handlePrefs, handleEditPrefs } = require("../utils/prefs")
const { generateUploadURL } = require("../utils/s3")
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
      const userDrops = await Drop.find({ users: currentUser })
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
  },
  // TBC if needed to populate this scheme here
  // GearList: {
  // 	items: async (root, args, context) => {
  // 		// await root.populate({
  // 		// 	path: 'items',
  // 		// 	populate: {
  // 		// 		path: 'gearItem',
  // 		// 		model: 'GearItem',
  // 		// 	},
  // 		// })
  //
  // 		console.log(root.items[0].gearItem)
  // 	},
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
        const tagObjects = tags ? await handleTags(tags, category) : []
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
        ).populate("tags")
      } catch (e) {
        throw new UserInputError("Editing Gear Item failed with error: " + e)
      }
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
      } catch (e) {
        throw new UserInputError("Delete error:", e)
      }
      return true
    },

    addList: async (root, args, context) => {
      checkAuth(context)
      const existingDrop = await Drop.findById(args.drop)
      await checkDropPermissions(context, existingDrop)
      const { category, comment } = args

      const newGearList = new GearList({
        category,
        comment,
      })

      existingDrop.lists = existingDrop.lists.concat(newGearList)
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
      await checkDropPermissions(context, parentDrop)
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
      await checkDropPermissions(context, parentDrop)
      try {
        parentDrop.lists.filter((list) => list !== listToDelete)
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
      await checkDropPermissions(context, parentDrop)
      const { gearItem, quantity, prefs, comment } = args
      listToAdd.items.push({
        gearItem,
        quantity,
        comment,
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
      return await listToAdd.save()
    },

    editListItem: async (root, args, context) => {
      checkAuth(context)
      const listToEdit = await GearList.findById(args.list)
      if (!listToEdit) {
        throw new UserInputError("List does not exist")
      }
      const parentDrop = await Drop.findOne({ lists: listToEdit })
      await checkDropPermissions(context, parentDrop)
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
      await checkDropPermissions(context, parentDrop)
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
      currentUser.username = args.username
      if (args.password) {
        currentUser.passwordHash = await bcrypt.hash(args.password, 10)
      }
      currentUser.profilePicture = args.profilePicture
      currentUser.fullName = args.fullName
      try {
        return currentUser.save()
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
      await currentUser
      return currentUser
    },
    getProfileImageUpload: async (root, args, context) => {
      checkAuth(context)
      const { currentUser } = context
      return await generateUploadURL("users", `${currentUser.id}.webp`)
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
      const drops = await Drop.find({}).populate("users").populate("lists")

      return drops
    },

    allTags: async (root, args, context) => {
      if (args.tag) {
        try {
          const tagSearch = await Tag.find({
            name: { $regex: args.tag, $options: "i" },
          })
          return tagSearch
        } catch {
          throw new UserInputError(`Error searching for tag: ${args.tag}`)
        }
      }
      return await Tag.find({})
    },

    allGearItems: async (root, args, context) => {
      if (args.id) {
        return [await GearItem.findById(args.id).populate("tags")]
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
          searchTerms.category = { $regex: args.category }
        }
        if (args.tags) {
          searchTerms.tags = { $in: args.tags }
        }
        return await GearItem.find(searchTerms).populate("tags")
      } catch (e) {
        throw new UserInputError(`Error searching: ${e}`)
      }
    },
  },
}

module.exports = resolvers
