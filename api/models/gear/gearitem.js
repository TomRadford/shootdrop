const mongoose = require('mongoose')

const schema = mongoose.Schema({
	manufacturer: {
		type: String,
		required: true,
	},
	model: {
		type: String,
		required: true,
	},
	description: String,
	images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
	productURL: String,
})

module.exports = mongoose.model('GearItem', schema)
