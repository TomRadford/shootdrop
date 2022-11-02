//https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_Scenario_PresignedUrl_section.html

const aws = require("aws-sdk")
const config = require("./config")

const bucketName = "shootdrop-images"

const s3 = new aws.S3({
  region: "eu-west-1",
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
})

const generateUploadURL = async (dir, filname) => {
  return await s3.getSignedUrlPromise("putObject", {
    Bucket: bucketName,
    Key: `${dir}/${filname}`,
    Expires: 20,
  })
}

module.exports = { generateUploadURL }
