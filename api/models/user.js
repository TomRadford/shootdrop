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
	// drops: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: 'Drop',
	// 	},
	// ],
})
module.exports = mongoose.model('User', schema)
