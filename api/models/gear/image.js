const mongoose = require("mongoose")

const schema = mongoose.Schema({
  url: String,
  //to be used for image tag in future
  width: Number,
  height: Number,
})

module.exports = mongoose.model("GearImage", schema)
