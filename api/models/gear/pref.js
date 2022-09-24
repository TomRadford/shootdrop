const mongoose = require('mongoose')

//['v-mount', 'b-mount', 'gold-mount']
//to selectable get _id to use in gearlist
// to be able to select opts
const prefOptSchema = mongoose.Schema({
	name: String,
})

//eg: "Power Solution"
const prefSchema = mongoose.Schema({
	gearItem: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'GearItem',
		required: true,
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
	GrearPrefOpts: mongoose.model(prefOptSchema, 'GearPrefOpt'),
	GearPref: mongoose.model(prefSchema, 'GearPref'),
}