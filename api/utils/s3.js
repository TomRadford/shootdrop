//https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_Scenario_PresignedUrl_section.html

const {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

const config = require("./config")

const bucketName = config.S3_BUCKET

// TODO: PROD set CORS allowed origin to be limted to
// images.shootdrop.com
// https://docs.aws.amazon.com/AmazonS3/latest/userguide/ManageCorsUsing.html

const client = new S3Client({
  region: "eu-west-1",
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
})

const generateUploadURL = async (dir, filname) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: `${dir}/${filname}`,
  })
  return await getSignedUrl(client, command, {
    expiresIn: 20,
  })
}

module.exports = { generateUploadURL }

// V2 SDK

// const aws = require("aws-sdk")
// const config = require("./config")

// const bucketName = "shootdrop-images"

// const s3 = new aws.S3({
//   region: "eu-west-1",
//   accessKeyId: config.AWS_ACCESS_KEY_ID,
//   secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
//   signatureVersion: "v4",
// })

// const generateUploadURL = async (dir, filname) => {
//   return await s3.getSignedUrlPromise("putObject", {
//     Bucket: bucketName,
//     Key: `${dir}/${filname}`,
//     Expires: 20,
//   })
// }
