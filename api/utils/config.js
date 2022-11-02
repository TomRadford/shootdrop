require("dotenv").config()

const SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
const AWS_ACCESS_KEY_ID =
  NODE_ENV === "production"
    ? process.env.AWS_ACCESS_KEY_ID
    : process.env.DEV_AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY =
  NODE_ENV === "production"
    ? process.env.AWS_SECRET_ACCESS_KEY
    : process.env.DEV_AWS_SECRET_ACCESS_KEY

module.exports = {
  SECRET,
  MONGODB_URI,
  PORT,
  NODE_ENV,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
}
