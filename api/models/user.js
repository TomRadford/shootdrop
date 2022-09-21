const mongoose = require('mongoose')
const schema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		minLength: 3,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	isGearhouse: Boolean,
})
module.exports = mongoose.model('User', schema)
