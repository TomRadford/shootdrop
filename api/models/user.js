const mongoose = require("mongoose")

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  gearhouse: {
    type: Boolean,
    default: false,
  },
  fullName: String,
  profilePicture: String,
})

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash
  },
})
module.exports = mongoose.model("User", schema)
