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
	gearhouse: {
		type: Boolean,
		default: false,
	},
	fullName: String,
})
module.exports = mongoose.model('User', schema)
