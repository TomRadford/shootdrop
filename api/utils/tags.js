const Tag = require('../models/gear/tag')

//Gets new tags, merges and returns object array
// of all inputed tags
const handleTags = (tags, category) => {
	// TO WORK OUT LATER
	// let outputTags = []
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
	// //run all .save promises
	// return Promise.all(promiseArray).then(() => {
	// 	console.log('promise done')
	// })
}

module.exports = { handleTags }
