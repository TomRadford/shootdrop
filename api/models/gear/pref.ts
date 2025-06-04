import mongoose from 'mongoose'

//['v-mount', 'b-mount', 'gold-mount']
//to selectable get _id to use in gearlist
// to be able to select opts
const prefOptSchema = new mongoose.Schema({
	name: String,
})

//eg: "Power Solution"
const prefSchema = new mongoose.Schema({
	gearItem: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'GearItem',
		required: true,
	},
	name: {
		type: String,
		default: '',
	},
	allOpts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'GearPrefOpt',
		},
	],
})

export const GearPrefOpt = mongoose.model<typeof prefOptSchema>(
	'GearPrefOpt',
	prefOptSchema
)
export const GearPref = mongoose.model<typeof prefSchema>(
	'GearPref',
	prefSchema
)
