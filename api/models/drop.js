const mongoose = require('mongoose')

const schema = new mongoose.Schema(
	{
		project: String,
		client: String,
		director: String,
		dop: String,
		soundie: String,
		gearCheckDate: Date,
		startDate: Date,
		endDate: Date,
		wrapDate: Date,
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		lists: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'GearList',
			},
		],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Drop', schema)
