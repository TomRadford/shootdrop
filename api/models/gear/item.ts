import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const schema = new mongoose.Schema(
	{
		category: [String],
		manufacturer: {
			type: String,
			required: true,
		},
		model: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: '',
		},
		images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GearImage' }],
		productURL: String,
		tags: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Tag',
			},
		],
	},
	// Note that this was only added to the schema after the fact 🚨
	{ timestamps: true }
)

schema.plugin(mongoosePaginate)

const GearItem = mongoose.model<typeof schema>('GearItem', schema)

export default GearItem
