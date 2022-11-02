const mongoose = require("mongoose")

const schema = mongoose.Schema({
  category: [String],
  manufacturer: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  description: String,
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "GearImage" }], //TBC: might use string
  productURL: String,
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
})

//add https://www.npmjs.com/package/mongoose-paginate-v2 plugin

module.exports = mongoose.model("GearItem", schema)
