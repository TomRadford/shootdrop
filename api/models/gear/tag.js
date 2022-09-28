const mongoose = require('mongoose')
const schema = mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
		},
		category: {
			type: String,
			required: true,
		},
	},
	{
		_id: false,
	}
)

module.exports = mongoose.model('Tag', schema)
