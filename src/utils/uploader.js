const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const uploader = async (fileName) => {
  // Set the region and access keys
  AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3();

  let videoFileS3Key =
    fileName.split(".").slice(0, -1).join(".") +
    "-" +
    new Date().getTime() +
    "." +
    fileName.split(".").pop();
  videoFileS3Key = videoFileS3Key.replaceAll(" ", "_");

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: videoFileS3Key,
    Body: fs.createReadStream(path.join(__dirname, `public/${fileName}`)),
  };

  try {
    return s3.upload(params);
  } catch (error) {
    return error;
  }
};

module.exports = {
  uploader: uploader,
};
