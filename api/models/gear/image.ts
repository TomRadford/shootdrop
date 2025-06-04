import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	url: String,
	//to be used for image tag in future
	width: Number,
	height: Number,
})

const GearImage = mongoose.model<typeof schema>('GearImage', schema)

export default GearImage
