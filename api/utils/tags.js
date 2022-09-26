const Tag = require('../models/gear/tag')

//Gets new tags, merges and returns object array
// of all inputed tags
const handleTags = async (tags, category) => {
	let outputTags = []
	const promiseArray = tags.map((tag) => {
		const existingTag = Tag.findOne({ name: tag })
		if (existingTag) {
			const newTag = new Tag({
				name: tag,
				category,
			})
			outputTags = outputTags.concat(newTag)
			return newTag.save()
		} else {
			outputTags = outputTags.concat(existingTag)
		}
	})
	await Promise.all(promiseArray)
	console.log(outputTags) //HERE! Getting tags to stop duplicating with name key
	return outputTags
}

module.exports = { handleTags }
