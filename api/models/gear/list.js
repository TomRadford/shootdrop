const mongoose = require('mongoose')

//GearListItem
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
		prefs: [
			{
				pref: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'GearPref',
				},
				opts: [
					{
						type: mongoose.Schema.Types.ObjectId,
						ref: 'GearPrefOpts',
					},
				],
			},
		],
		comment: String,
	},
	{ timestamps: true }
)

const schema = mongoose.Schema({
	category: {
		type: String,
		required: true,
	},
	comment: String,
	items: [subSchema],
})

module.exports = mongoose.model('GearList', schema)