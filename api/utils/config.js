require("dotenv").config()

const SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

module.exports = {
  SECRET,
  MONGODB_URI,
  PORT,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
}
