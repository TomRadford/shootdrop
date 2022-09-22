const mongoose = require('mongoose')

//toGetID
const optionSchema = mongoose.Schema({
	name: String,
})

const schema = mongoose.Schema({
	gearItem: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'GearItem',
	},
	name: {
		type: String,
		required: true,
	},
	options: [optionSchema],
})

module.exports = mongoose.model(schema, 'Pref')
