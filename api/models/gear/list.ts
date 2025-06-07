import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const GearListItemSchema = new mongoose.Schema(
	{
		gearList: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'GearList',
		},
		gearItem: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'GearItem',
			required: true,
		},
		quantity: {
			type: Number,
			default: 1,
		},
		userThatUpdated: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		prefs: [
			{
				pref: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'GearPref',
				},
				opts: [
					{
						type: mongoose.Schema.Types.ObjectId,
						ref: 'GearPrefOpts',
					},
				],
			},
		],
		comment: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true }
)
GearListItemSchema.plugin(aggregatePaginate)

const GearListSchema = new mongoose.Schema(
	{
		category: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			default: '',
		},
		comment: {
			type: String,
			default: '',
		},
		drop: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Drop',
		},
	},
	{
		timestamps: true,
	}
)

export const GearList = mongoose.model<typeof GearListSchema>(
	'GearList',
	GearListSchema
)

export const GearListItem = mongoose.model<typeof GearListItemSchema>(
	'GearListItem',
	GearListItemSchema
)
