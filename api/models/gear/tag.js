const mongoose = require('mongoose')

const schema = mongoose.Schema({
	name: {
		type: String,
		unique: true,
	},
	category: {
		type: String,
	},
})

module.exports = mongoose.model('Tag', schema)
