const { UserInputError, AuthenticationError } = require('apollo-server-core')
const { GraphQLScalarType, Kind } = require('graphql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Drop = require('../models/drop')
const GearList = require('../models/gear/list')
const GearItem = require('../models/gear/item')
const config = require('../utils/config')
const logger = require('../utils/logger')
const { checkAuth, checkListPermissions } = require('../utils/auth')
const { handleTags } = require('../utils/tags')
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
			} = args
			const tagObjects = handleTags(tags, category)
			// console.log('tag objs: ' + tagObjects)
			const newGearItem = new GearItem({
				category,
				manufacturer,
				model,
				description,
				images,
				productURL,
				tags: tagObjects,
			})
			return await newGearItem.save()
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
			await checkListPermissions(context, existingDrop)
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
				throw new UserInputError('List not found')
			}
			const parentDrop = await Drop.findOne({ lists: existingGearList })
			const { currentUser } = context
			if (!parentDrop.users.includes(currentUser._id)) {
				throw new UserInputError('User is not part of this drop')
			}
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
			await checkListPermissions(context, parentDrop)
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
			return newUser.save().catch((e) => {
				return new UserInputError(e.message, {
					invalidArgs: args,
				})
			})
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
			const drops = await Drop.find({}).populate('users')
			return drops
		},
	},
}

module.exports = resolvers
