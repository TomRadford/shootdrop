const { UserInputError, AuthenticationError } = require('apollo-server-core')
const { GraphQLScalarType, Kind } = require('graphql')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Drop = require('../models/drop')
const Tag = require('../models/gear/tag')
const GearList = require('../models/gear/list')
const GearItem = require('../models/gear/item')
const config = require('../utils/config')
const logger = require('../utils/logger')
const { checkAuth, checkDropPermissions } = require('../utils/auth')
const { handleTags } = require('../utils/tags')
const { GearPref } = require('../models/gear/pref')
const { handlePrefs, handleEditPrefs } = require('../utils/prefs')
const dateScalar = new GraphQLScalarType({
	name: 'Date',
	description: 'Date scalar type',
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
			}).populate('allOpts')

			return gearItemPrefs
		},
	},
	GearList: {
		items: async (root, args, context) => {
			await root.populate({
				path: 'items',
				populate: {
					path: 'gearItem',
					model: 'GearItem',
				},
			})
			//HERE trying to lists to return items
			console.log(root.items[0].gearItem)
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
						returnDocument: 'after',
					}
				).populate('tags')
			} catch (e) {
				throw new UserInputError('Editing Gear Item failed with error: ' + e)
			}
		},
		addDrop: async (root, args, context) => {
			checkAuth(context)
			const { currentUser } = context
			const drop = new Drop({
				...args,
				users: [currentUser],
			})

			await drop.populate('users')
			return await drop.save()
		},

		updateDrop: async (root, args, context) => {
			checkAuth(context)
			const existingDrop = await Drop.findByIdAndUpdate(
				args.id,
				{
					...args,
				},
				{ returnDocument: 'after' }
			)
			return existingDrop
		},

		removeDrop: async (root, args, context) => {
			checkAuth(context)
			const { currentUser } = context
			const drop = await Drop.findById(args.drop)
			if (!drop) {
				throw new UserInputError('Drop not found')
			}
			//change to includes method?
			const canRemove = drop.users.find(
				(user) => user._id.toString() === currentUser._id.toString()
			)
			if (!canRemove) {
				throw new AuthenticationError('User not authorized to delete')
			}
			try {
				await Drop.findByIdAndDelete(args.drop)
			} catch (e) {
				throw new UserInputError('Delete error:', e)
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
				throw new UserInputError('List does not exist')
			}
			const parentDrop = await Drop.findOne({ lists: existingGearList })
			await checkDropPermissions(context, parentDrop)
			const { comment } = args
			const newList = await GearList.findByIdAndUpdate(
				args.id,
				{
					comment,
				},
				{ returnDocument: 'after' }
			)
			return newList
		},

		removeList: async (root, args, context) => {
			checkAuth(context)
			const listToDelete = await GearList.findById(args.id)
			if (!listToDelete) {
				throw new UserInputError('List does not exist')
			}
			const parentDrop = await Drop.findOne({ lists: listToDelete })
			await checkDropPermissions(context, parentDrop)
			try {
				parentDrop.lists.filter((list) => list !== listToDelete)
				await listToDelete.delete()
				return true
			} catch (e) {
				throw new UserInputError(
					'Failed to remove list with error: ',
					e.message
				)
			}
		},

		addListItem: async (root, args, context) => {
			checkAuth(context)
			const listToAdd = await GearList.findById(args.list)
			if (!listToAdd) {
				throw new UserInputError('List does not exist')
			}
			const parentDrop = await Drop.findOne({ lists: listToAdd })
			await checkDropPermissions(context, parentDrop)
			const { gearItem, quantity, prefs, comment } = args
			listToAdd.items.push({
				gearItem,
				quantity,
				comment,
			})
			return await listToAdd.save()
		},

		createUser: async (root, args) => {
			const existingUser = await User.findOne({ username: args.username })
			if (existingUser) {
				return new UserInputError('Username already exists')
			}
			const passwordHash = await bcrypt.hash(args.password, 10)
			const newUser = new User({
				username: args.username,
				passwordHash,
			})
			try {
				return newUser.save()
			} catch (e) {
				throw new UserInputError(e.message, {
					invalidArgs: args,
				})
			}
		},

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })
			const passwordCorrect =
				user === null ? false : bcrypt.compare(args.password, user.passwordHash)
			if (!passwordCorrect) {
				throw new UserInputError('Incorrect password')
			}
			const userForToken = {
				id: user._id,
				username: user.username,
				gearhouse: user.gearhouse,
			}
			return {
				value: jwt.sign(userForToken, config.SECRET, {
					expiresIn: 60 * 60 * 3,
				}),
			}
		},
	},
	Query: {
		me: async (root, args, context) => {
			const { currentUser } = context
			await currentUser
			return currentUser
		},

		allDrops: async (root, args, context) => {
			if (args.drop) {
				try {
					const drop = await Drop.findById(args.drop)
						.populate('users')
						.populate('lists')
					return [drop]
				} catch {
					throw new UserInputError('Drop not found', {
						args: args,
					})
				}
			}

			if (!process.env.NODE_ENV === 'development') {
				//placeholder to protect all drops on prod
				throw new AuthenticationError('Unauthoized')
			}
			const drops = await Drop.find({}).populate('users').populate('lists')

			return drops
		},

		allTags: async (root, args, context) => {
			if (args.tag) {
				try {
					const tagSearch = await Tag.find({
						name: { $regex: args.tag, $options: 'i' },
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
				return [await GearItem.findById(args.id).populate('tags')]
			}
			try {
				const searchTerms = {}
				if (args.manufacturer) {
					searchTerms.manufacturer = {
						$regex: args.manufacturer,
						$options: 'i',
					}
				}
				if (args.model) {
					searchTerms.model = { $regex: args.model, $options: 'i' }
				}
				if (args.category) {
					searchTerms.category = { $regex: args.category }
				}
				if (args.tags) {
					searchTerms.tags = { $in: args.tags }
				}
				return await GearItem.find(searchTerms).populate('tags')
			} catch (e) {
				throw new UserInputError(`Error searching: ${e}`)
			}
		},
	},
}

module.exports = resolvers
