import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
	},
	category: {
		type: [String],
		default: [],
	},
})

const Tag = mongoose.model<typeof schema>('Tag', schema)

export default Tag
