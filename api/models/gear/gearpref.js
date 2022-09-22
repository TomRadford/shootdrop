const mongoose = require('mongoose')

//['v-mount', 'b-mount', 'gold-mount']
//to selectable get _id to use in gearlist
// to be able to select opts
const prefOptsSchema = mongoose.Schema({
	name: String,
})

//"Power Solution"
const prefSchema = mongoose.Schema({
	gearItem: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'GearItem',
	},
	name: {
		type: String,
		required: true,
	},
	allOpts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'GearPrefOpts',
		},
	],
})

module.exports = {
	GrearPrefOpts: mongoose.model(prefOptsSchema, 'GearPrefOpts'),
	GearPref: mongoose.model(prefSchema, 'GearPref'),
}
