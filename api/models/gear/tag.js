const mongoose = require("mongoose")

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

module.exports = mongoose.model("Tag", schema)
