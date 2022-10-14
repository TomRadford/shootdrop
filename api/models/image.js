const mongoose = require("mongoose")

//TBC IF NEEDED

//To use with S3 Single URL uploads
const schema = mongoose.Schema({
  url: String,
  //TBC for NextJS image
  width: Number,
  height: Number,
})

module.exports = mongoose.model("Image", schema)
