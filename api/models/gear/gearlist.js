const mongoose = require('mongoose')

const subSchema = mongoose.Schema(
	{
		gearItem: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'GearItem',
			required: true,
		},
		quantity: {
			type: Number,
			default: 1,
		},
		comment: String,
	},
	{ timestamps: true }
)

const schema = mongoose.Schema({
	category: {
		type: String,
		required: true,
	},
	items: [subSchema],
})

module.exports = mongoose.model('GearList', schema)
