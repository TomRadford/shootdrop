import { GraphQLScalarType, GraphQLError, Kind } from 'graphql'
import { ApolloServerErrorCode } from '@apollo/server/errors'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid/async'
import User from '../models/user'
import Drop from '../models/drop'
import Tag from '../models/gear/tag'
import { GearList, GearListItem } from '../models/gear/list'
import GearItem from '../models/gear/item'
import GearImage from '../models/gear/image'
import config from '../utils/config'
import { checkAuth, checkDropPermissions } from '../utils/auth'
import { handleTags } from '../utils/tags'
import { GearPref, GearPrefOpt } from '../models/gear/pref'
import { handlePrefs, handleEditPrefs } from '../utils/prefs'
import { generateUploadURL, deleteS3Object } from '../utils/s3'
import { sendAccountRequest, sendPasswordReset } from '../utils/mailer'

const dateScalar = new GraphQLScalarType({
	name: 'Date',
	description: 'Date scalar type',
	serialize(value) {
		return (value as Date).getTime()
	},
	parseValue(value) {
		return new Date(value as string)
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
				'users'
			) // ToDo: revisit popluating users in drop rather?
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
		//Populates tags if they're queried
		tags: async (root, args, context) => {
			const gearItemWithTags = await root.populate('tags')
			return gearItemWithTags.tags
		},
		//Populates images if they're queried
		images: async (root, args, context) => {
			// Skip populate on agregated requests (used for randomised request with agregate)
			if (!root.images.toString().includes('[object Object]')) {
				const gearItemWithImages = await root.populate('images')
				return gearItemWithImages.images
			}
			return root.images
		},
	},
	Drop: {
		users: async (root, args, context) => {
			const dropWithUsers = await root.populate('users')
			return dropWithUsers.users
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
		userThatUpdated: async (root, args, context) => {
			const user = await User.findById(root.userThatUpdated)
			return user
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
			const { name, category } = args
			const existingTag = await Tag.findOne({ name: name.toLowerCase() })
			if (existingTag) {
				throw new GraphQLError('Tag already exists', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
			const newTag = new Tag({
				name: name.toLowerCase(),
				category: args.category ? args.category : [],
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
					//@ts-expect-error TODO: Mongoose upgrade
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
				)
					.populate('tags')
					.populate('images')
			} catch (e) {
				throw new GraphQLError('Editing Gear Item failed with error: ' + e, {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
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
					{ returnDocument: 'after' }
				)
			} catch (e) {
				throw new GraphQLError('Editing Gear Pref failed with error: ' + e, {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
		},
		removeGearPref: async (root, args, context) => {
			checkAuth(context)
			try {
				const prefToDelete = await GearPref.findById(args.id)
				//@ts-expect-error TODO: Mongoose upgrade
				await GearPrefOpt.deleteMany({ _id: { $in: prefToDelete.opts } })
				await prefToDelete.delete()
				//Also delete refs in GearListItem
				const listItemsWithPref = await GearListItem.find({
					//@ts-expect-error TODO: Mongoose upgrade
					'prefs.pref': mongoose.Types.ObjectId(prefToDelete.id),
				})

				listItemsWithPref.forEach(async (listItem) => {
					listItem.prefs = listItem.prefs.filter(
						(pref) => pref.pref.toString() !== prefToDelete.id
					)

					await listItem.save()
				})

				return prefToDelete.id
			} catch (e) {
				throw new GraphQLError('Removing Gear Pref failed with error: ' + e, {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
		},

		addGearPrefOpt: async (root, args, context) => {
			checkAuth(context)
			try {
				//Create a new gearPrefOpt
				//append it to allOpts in pref
				//returns new pref to update UI
				const newGearPrefOpt = new GearPrefOpt({
					name: '',
				})
				await newGearPrefOpt.save()
				return await GearPref.findByIdAndUpdate(
					args.gearPref,
					{
						$push: {
							allOpts: newGearPrefOpt,
						},
					},
					{ returnDocument: 'after' }
				).populate('allOpts')
			} catch (e) {
				throw new GraphQLError('Adding Gear Pref Opt failed with error: ' + e, {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
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
					{ returnDocument: 'after' }
				)
			} catch (e) {
				throw new GraphQLError(
					'Editing Gear Pref Opt failed with error: ' + e,
					{
						extensions: {
							code: ApolloServerErrorCode.BAD_USER_INPUT,
						},
					}
				)
			}
		},
		removeGearPrefOpt: async (root, args, context) => {
			checkAuth(context)
			try {
				//removes opt and reutrns new GearPref
				await GearPrefOpt.findByIdAndDelete(args.id)

				//Delete opt refs in GearListItem
				const listItemsWithPref = await GearListItem.find({
					//@ts-expect-error TODO: Mongoose upgrade
					'prefs.pref': mongoose.Types.ObjectId(args.gearPref),
				})
				listItemsWithPref.forEach(async (listItem) => {
					listItem.prefs = listItem.prefs.map((pref) => {
						return {
							pref: pref.pref,
							opts: pref.opts.filter((opt) => opt.toString() !== args.id),
							//@ts-expect-error TODO: Mongoose upgrade
							_id: pref._id,
						}
					})
					await listItem.save()
				})
				//Remove this opt ref in GearPref
				return await GearPref.findByIdAndUpdate(
					args.gearPref,
					{
						$pull: {
							allOpts: args.id,
						},
					},
					{ returnDocument: 'after' }
				).populate('allOpts')
			} catch (e) {
				throw new GraphQLError(
					'Removing Gear Pref Opt failed with error: ' + e,
					{
						extensions: {
							code: ApolloServerErrorCode.BAD_USER_INPUT,
						},
					}
				)
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
				throw new GraphQLError('Gear image does not exist', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
			await deleteS3Object(
				`gear/${args.gearItem}`,
				gearImage.url.split('/').at(-1)
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

			await drop.populate('users')
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
				{ returnDocument: 'after' }
			)
				.populate('users')
				.populate('lists')
			return existingDrop
		},

		removeDrop: async (root, args, context) => {
			checkAuth(context)

			const drop = await Drop.findById(args.drop)

			if (!drop) {
				throw new GraphQLError('Drop not found', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}

			checkDropPermissions(context, drop)

			try {
				await Drop.findByIdAndDelete(args.drop)
				drop.lists.map(async (list) => {
					await GearListItem.deleteMany({ gearList: list })
				})
				await GearList.deleteMany({ drop: args.drop })
			} catch (e) {
				throw new GraphQLError('Delete error: ' + e, {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
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

			//@ts-expect-error TODO: Mongoose upgrade
			existingDrop.lists.push(newGearList)
			await existingDrop.save()

			return await newGearList.save()
		},

		editList: async (root, args, context) => {
			checkAuth(context)
			const existingGearList = await GearList.findById(args.id)
			if (!existingGearList) {
				throw new GraphQLError('List does not exist', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
			const parentDrop = await Drop.findOne({ lists: existingGearList })
			checkDropPermissions(context, parentDrop)
			const { comment, title } = args
			const newList = await GearList.findByIdAndUpdate(
				args.id,
				{
					...(comment && { comment }),
					...(title && { title }),
				},
				{ returnDocument: 'after' }
			)
			return newList
		},

		removeList: async (root, args, context) => {
			checkAuth(context)
			const listToDelete = await GearList.findById(args.id)
			if (!listToDelete) {
				throw new GraphQLError('List does not exist', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
			const parentDrop = await Drop.findOne({ lists: listToDelete })
			checkDropPermissions(context, parentDrop)
			try {
				parentDrop.lists = parentDrop.lists.filter(
					//@ts-expect-error TODO: Mongoose upgrade
					(list) => list !== listToDelete
				)
				await parentDrop.save()
				await listToDelete.delete()
				return true
			} catch (e) {
				throw new GraphQLError('Failed to remove list with error: ' + e, {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
		},

		addListItem: async (root, args, context) => {
			//Note: if GearItem already exisits, quantity will increment
			// and existing ListItem will return
			checkAuth(context)
			const listToAdd = await GearList.findById(args.list)
			if (!listToAdd) {
				throw new GraphQLError('List does not exist', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
			const parentDrop = await Drop.findOne({ lists: listToAdd })
			checkDropPermissions(context, parentDrop)
			const { gearItem, quantity, prefs, comment } = args
			const existingGearListItem = await GearListItem.findOne({
				gearItem,
				gearList: args.list,
			}).populate('prefs')
			//force update timestamps of drop and list
			parentDrop.updatedAt = new Date()
			await parentDrop.save()
			listToAdd.updatedAt = new Date()
			await listToAdd.save()
			if (existingGearListItem) {
				// If gearItem already exists in this list:
				// increment quantity instead of duplicating
				existingGearListItem.quantity = existingGearListItem.quantity + 1

				if (
					existingGearListItem.comment !== comment &&
					typeof comment === 'string'
				) {
					existingGearListItem.comment = comment
				}

				existingGearListItem.prefs = prefs
					? prefs.map((pref) => {
							//ToDo: relook at pref getting added here as existing would be overwritten
							// For now: client does not alter prefs on add so can be ignored
							return {
								//@ts-expect-error TODO: Mongoose upgrade
								pref: mongoose.Types.ObjectId(pref.id),
								//@ts-expect-error TODO: Mongoose upgrade
								opts: pref.opts.map((opt) => mongoose.Types.ObjectId(opt)),
							}
					  })
					: existingGearListItem.prefs
					? existingGearListItem.prefs
					: null
				existingGearListItem.userThatUpdated = context.currentUser
				return await existingGearListItem.save()
			} else {
				const newGearListItem = new GearListItem({
					gearItem,
					quantity,
					comment,
					gearList: listToAdd,
					userThatUpdated: context.currentUser,
					prefs: prefs
						? prefs.map((pref) => {
								return {
									//@ts-expect-error TODO: Mongoose upgrade
									pref: mongoose.Types.ObjectId(pref.id),
									//@ts-expect-error TODO: Mongoose upgrade
									opts: pref.opts.map((opt) => mongoose.Types.ObjectId(opt)),
								}
						  })
						: null,
				})

				return await newGearListItem.save()
			}
		},

		editListItem: async (root, args, context) => {
			checkAuth(context)
			const listToEdit = await GearList.findById(args.list)
			if (!listToEdit) {
				throw new GraphQLError('List does not exist', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
			const parentDrop = await Drop.findOne({ lists: listToEdit })
			checkDropPermissions(context, parentDrop)
			const { quantity, prefs, comment } = args
			try {
				const listItem = await GearListItem.findById(args.id)
				listItem.userThatUpdated = context.currentUser
				if (quantity) {
					listItem.quantity = quantity
				}
				if (comment) {
					listItem.comment = comment
				}
				if (comment === '') {
					listItem.comment = ''
				}
				if (prefs) {
					listItem.prefs = prefs.map((pref) => {
						return {
							//@ts-expect-error TODO: Mongoose upgrade
							pref: mongoose.Types.ObjectId(pref.id),
							//@ts-expect-error TODO: Mongoose upgrade
							opts: pref.opts.map((opt) => mongoose.Types.ObjectId(opt)),
						}
					})
				}
				return await listItem.save()
			} catch {
				throw new GraphQLError('List item does not exist', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
		},

		removeListItem: async (root, args, context) => {
			checkAuth(context)
			const listToEdit = await GearList.findById(args.list)
			if (!listToEdit) {
				throw new GraphQLError('List does not exist', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
			const parentDrop = await Drop.findOne({ lists: listToEdit })
			checkDropPermissions(context, parentDrop)
			try {
				const gearListItem = await GearListItem.findById(args.id)
				await gearListItem.delete()
				return gearListItem.id
			} catch {
				throw new GraphQLError('List item does not exist', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
		},

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username.toLowerCase() })
			const passwordCorrect =
				user === null
					? false
					: await bcrypt.compare(args.password, user.passwordHash)
			if (!passwordCorrect) {
				throw new GraphQLError('Incorrect password', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
			if (!user.enabled) {
				throw new GraphQLError('Account not activated yet', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
			const userForToken = {
				id: user._id,
				username: user.username,
			}
			return {
				value: jwt.sign(userForToken, config.SECRET as any, {
					expiresIn: 60 * 60 * 24 * 7, // 7 days
				}),
			}
		},

		passwordReset: async (root, args) => {
			//Mails a token that lasts 60 min to login and change password
			const user = await User.findOne({ username: args.username })
			if (!user) {
				throw new GraphQLError('User account does not exist', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
			if (!user.enabled) {
				throw new GraphQLError('Account not activated yet', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
			const userForToken = {
				id: user._id,
				username: user.username,
			}
			await sendPasswordReset(
				user,
				jwt.sign(userForToken, config.SECRET as any, {
					expiresIn: 10 * 60,
				})
			)
			return true
		},

		createUser: async (root, args) => {
			if (process.env.NODE_ENV === 'production') {
				const hcaptchaRes = await fetch('https://hcaptcha.com/siteverify', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: `response=${args.captchaToken}&secret=${config.HCAPTCHASECRET}`,
				})
				const hCaptchaResult = await hcaptchaRes.json()
				if (!hCaptchaResult.success) {
					throw new GraphQLError('Captcha invalid please try again', {
						extensions: {
							code: ApolloServerErrorCode.BAD_USER_INPUT,
						},
					})
				}
			}

			const existingUser = await User.findOne({
				username: args.username.toLowerCase(),
			})
			if (existingUser) {
				throw new GraphQLError('Account already exists', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
			const passwordHash = await bcrypt.hash(args.password, 10)
			const newUser = new User({
				username: args.username.toLowerCase(),
				passwordHash,
				profilePicture: args.profilePicture,
				fullName: args.fullName,
				enabled: false,
			})
			try {
				await newUser.save()
				await sendAccountRequest(newUser)
				return newUser
			} catch (e) {
				throw new GraphQLError('Error creating user: ' + e, {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
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

			currentUser.profilePicture = args.profilePicture

			if (args.fullName) {
				currentUser.fullName = args.fullName
			}
			try {
				return await currentUser.save()
			} catch (e) {
				throw new GraphQLError('Error editing user: ' + e, {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
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
			return await generateUploadURL('users', `${currentUser.id}.webp`)
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
						.populate('users')
						.populate('lists')
					// console.log(drop.lists[0].items)
					return [drop]
				} catch (e) {
					throw new GraphQLError('Error finding drop', {
						extensions: {
							code: ApolloServerErrorCode.BAD_USER_INPUT,
						},
					})
				}
			}

			if (process.env.NODE_ENV === 'production') {
				//placeholder to protect all drops on prod
				throw new GraphQLError('Unauthoized', {
					extensions: {
						code: 'UNAUTHENTICATED',
					},
				})
			}

			const drops = await Drop.find({}).populate('users').populate('lists')

			return drops
		},

		getList: async (root, args, context) => {
			try {
				return await GearList.findById(args.id)
			} catch (e) {
				throw new GraphQLError('Error finding list', {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
		},

		getListItems: async (root, args, context) => {
			try {
				let options = {}

				if (args.limit) {
					//@ts-expect-error TODO: Mongoose upgrade
					options.limit = args.limit
				} else {
					//@ts-expect-error TODO: Mongoose upgrade
					options.limit = 16
				}
				if (args.offset) {
					//@ts-expect-error TODO: Mongoose upgrade
					options.offset = args.offset
				}

				const aggregateParams = [
					{
						$lookup: {
							from: 'gearitems',
							localField: 'gearItem',
							foreignField: '_id',
							as: 'gearItem',
						},
					},
					{
						$addFields: {
							id: '$_id',
						},
					},
				]

				if (args.list) {
					aggregateParams.push({
						//@ts-expect-error TODO: Mongoose upgrade
						$match: {
							gearList: new mongoose.Types.ObjectId(args.list),
						},
					})
				}

				if (args.tags) {
					aggregateParams.push({
						//@ts-expect-error TODO: Mongoose upgrade
						$match: {
							'gearItem.tags': {
								//@ts-expect-error TODO: Mongoose upgrade
								$all: args.tags.map((tag) => mongoose.Types.ObjectId(tag)),
							},
						},
					})
				}

				//@ts-expect-error TODO: Mongoose upgrade
				options.sort = { _id: -1 }
				const gearListItemAggregate = GearListItem.aggregate(aggregateParams)

				//@ts-expect-error TODO: Mongoose upgrade
				const paginatedResults = await GearListItem.aggregatePaginate(
					gearListItemAggregate,
					options
				)

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
				throw new GraphQLError(`Error searching: ${e}`, {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
		},

		allTags: async (root, args, context) => {
			try {
				// if 'tags' array param, return all tags
				// in that array in order of request array
				// using mongodb aggregation pipeline
				if (args.tags) {
					//@ts-expect-error TODO: Mongoose upgrade
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
									$indexOfArray: [tags, '$_id'],
								},
							},
						},
						{ $sort: { __order: 1 } },
						{
							$project: {
								_id: 0,
								id: '$_id',
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
						name: { $regex: args.tag, $options: 'i' },
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
				const tagSearch = await Tag.find(findParams).sort('name').limit(20)
				return tagSearch
			} catch {
				throw new GraphQLError(`Error searching for tag: ${args.tag}`, {
					extensions: {
						code: 'INTERNAL_SERVER_ERROR',
					},
				})
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
			if (args.random) {
				// Randomise gear items returned,
				// no pagination
				// pagination values will return null
				// only populates images not tags/allPrefs
				// limit used to set amount of random items
				const gearItems = await GearItem.aggregate([
					{
						$addFields: {
							id: '$_id',
						},
					},
					{
						$lookup: {
							from: 'gearimages',
							localField: 'images',
							foreignField: '_id',
							as: 'images',
						},
					},
				]).sample(args.limit ? args.limit : 16)

				return { gearItems: gearItems }
			}
			try {
				const searchTerms = {}
				if (args.manufacturer) {
					//@ts-expect-error TODO: Mongoose upgrade
					searchTerms.manufacturer = {
						$regex: args.manufacturer,
						$options: 'i',
					}
				}
				if (args.model) {
					//@ts-expect-error TODO: Mongoose upgrade
					searchTerms.model = { $regex: args.model, $options: 'i' }
				}
				if (args.category) {
					//@ts-expect-error TODO: Mongoose upgrade
					searchTerms.category = { $in: [args.category] }
				}
				if (args.tags) {
					//@ts-expect-error TODO: Mongoose upgrade
					searchTerms.tags = { $all: args.tags }
				}
				let options = {}
				if (args.limit) {
					//@ts-expect-error TODO: Mongoose upgrade
					options.limit = args.limit
				} else {
					//@ts-expect-error TODO: Mongoose upgrade
					options.limit = 16
				}
				if (args.offset) {
					//@ts-expect-error TODO: Mongoose upgrade
					options.offset = args.offset
				}
				//Sort by most recently added
				//@ts-expect-error TODO: Mongoose upgrade
				options.sort = { _id: -1 }
				//@ts-expect-error TODO: Mongoose upgrade
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
				throw new GraphQLError(`Error searching: ${e}`, {
					extensions: {
						code: ApolloServerErrorCode.BAD_USER_INPUT,
					},
				})
			}
		},

		allUsers: async (root, args, context) => {
			checkAuth(context)
			if (args.fullName) {
				return await User.find({
					fullName: { $regex: args.fullName, $options: 'i' },
					enabled: true,
				})
			} // Implement $search later on if we stick to Atlas
			return User.find({})
		},

		findNewGear: async (root, args, context) => {
			checkAuth(context)
			// Scraping disabled for now
			// const { searchTerm } = args
			// const allCategories = ['Camera', 'Grips', 'Lighting', 'Sound']
			// try {
			// const res = await puppeteerFetch(
			// 	`${config.GEAR_SOURCE}/navigation/search`,
			// 	{
			// 		headers: {
			// 			'x-cors-api-key': config.GEAR_SOURCE_KEY,
			// 			'Content-Type': 'application/json',
			// 		},
			// 		method: 'POST',
			// 		body: JSON.stringify({
			// 			pageNumber: 1,
			// 			filters: [],
			// 			searchTerm,
			// 		}),
			// 	}
			// )
			// console.log(res)

			// const res = await getNewGearResults(searchTerm)
			// if (res.data?.items) {
			// 	const newGearResult = res.data.items.map((item) => {
			// 		return {
			// 			sku: item.itemKey.skuNo,
			// 		}
			// 	})
			// 	return newGearResult
			// }
			return []
			// } catch (e) {
			// 	throw new UserInputError(`Error finding new gear: ${e}`)
			// }
		},
	},
}

export default resolvers
