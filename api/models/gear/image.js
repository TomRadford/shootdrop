const mongoose = require("mongoose")

const schema = mongoose.Schema({
  url: String,
  width: Number,
  height: Number,
})

module.exports = mongoose.model("GearImage", schema)
