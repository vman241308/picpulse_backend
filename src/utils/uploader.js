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

  const fileContent = fs.readFileSync(
    path.join(__dirname, `public/${fileName}`)
  );

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: videoFileS3Key,
    Body: fileContent,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err); // reject promise if there is an error
      } else {
        resolve(data.Location); // resolve promise with the file location
      }
    });
  }).catch((error) => {
    console.log(error);
    return error;
  });
};

module.exports = {
  uploader: uploader,
};
