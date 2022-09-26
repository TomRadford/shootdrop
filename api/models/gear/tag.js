const mongoose = require('mongoose')
const schema = mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
		},
		category: String,
	},
	{
		id: false,
	}
)

module.exports = mongoose.model('Tag', schema)
