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
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }], //TBC: might use string
  productURL: String,
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
})

module.exports = mongoose.model("GearItem", schema)
