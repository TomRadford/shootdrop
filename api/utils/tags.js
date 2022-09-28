const Tag = require('../models/gear/tag')

//Gets new tags, merges and returns object array
// of all inputed tags
const handleTags = async (tags, category) => {
	let outputTags = []

	for await (const tag of tags) {
		const existingTag = await Tag.findOne({ name: tag })
		console.log(existingTag)
		if (!existingTag) {
			const newTag = new Tag({
				name: tag,
				category,
			})
			outputTags = [...outputTags, newTag]
			await newTag.save()
		} else {
			outputTags = [...outputTags, existingTag]
		}
	}

	// const promiseArray = tags.map((tag) => {
	// 	Tag.findOne({ name: tag }).then((existingTag) => {
	// 		if (!existingTag) {
	// 			const newTag = new Tag({
	// 				name: tag,
	// 				category,
	// 			})
	// 			outputTags = [...outputTags, newTag]
	// 			return newTag.save()
	// 		} else {
	// 			outputTags = [...outputTags, existingTag]
	// 		}
	// 	})
	// })

	return outputTags
}

module.exports = { handleTags }
