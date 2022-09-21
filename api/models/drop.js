const mongoose = require('mongoose')

// const gearlistSubSchema = mongoose.Schema

const schema = mongoose.Schema(
	{
		project: String,
		client: String,
		dop: mongoose.Schema.Types.ObjectId || String,
		director: mongoose.Schema.Types.ObjectId || String,
		gearCheckDate: Date,
		startDate: Date,
		endDate: Date,
		wrapDate: Date,
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Drop', schema)
