//https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_Scenario_PresignedUrl_section.html

const {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

const config = require("./config")

const bucketName = config.S3_BUCKET

// CORS limited to shootdrop.com
// https://docs.aws.amazon.com/AmazonS3/latest/userguide/ManageCorsUsing.html

const client = new S3Client({
  region: "eu-west-1",
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
  ...(config.IS_DEV && {
    endpoint: "http://localhost:9000",
    forcePathStyle: true,
    checksumValidation: false,
  }),
})

const generateUploadURL = async (dir, filename) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: `${dir}/${filename}`,
  })
  return await getSignedUrl(client, command, {
    expiresIn: 20,
  })
}

const deleteS3Object = async (dir, filename) => {
  const key = `${dir}/${filename}`
  try {
    await client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      })
    )
  } catch (e) {
    console.error(e)
  }
}

module.exports = { generateUploadURL, deleteS3Object }
