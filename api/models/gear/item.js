const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new mongoose.Schema({
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
})

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('GearItem', schema)
