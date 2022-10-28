const Tag = require("../models/gear/tag")

//Gets new tags, merges and returns object array
// of all inputed tags
const handleTags = async (tags, category) => {
  let outputTags = []
  for await (const tag of tags) {
    const existingTag = await Tag.findOne({ name: tag.toLowerCase() })
    if (!existingTag) {
      const newTag = new Tag({
        name: tag.toLowerCase(),
        category,
      })
      outputTags = [...outputTags, newTag]
      await newTag.save()
    } else {
      outputTags = [...outputTags, existingTag]
    }
  }

  return outputTags
}

module.exports = { handleTags }
