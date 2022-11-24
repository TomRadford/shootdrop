const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  //NB: doubles as email address
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
  //For early access control, manually set in db
  enabled: {
    type: Boolean,
    default: false,
  },
})

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash
  },
})
module.exports = mongoose.model("User", schema)
