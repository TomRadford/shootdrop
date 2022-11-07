const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const schema = new mongoose.Schema({
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

schema.plugin(mongoosePaginate)

module.exports = mongoose.model("GearItem", schema)
