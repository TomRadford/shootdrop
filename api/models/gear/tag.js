const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  category: [String],
})

module.exports = mongoose.model("Tag", schema)
