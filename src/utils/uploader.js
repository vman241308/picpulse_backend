const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const uploader = async (fileName) => {
  try {
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

    let fileContent;
    try {
      fileContent = fs.readFileSync(path.join(__dirname, `public/${fileName}`));
    } catch (fileError) {
      console.error(`Error reading file ${fileName}:`, fileError);
      throw fileError; // Rethrow the error after logging to ensure the catch block outside this scope handles it.
    }

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
          // Delete the local file after upload
          fs.unlink(path.join(__dirname, `public/${fileName}`), (unlinkError) => {
            if (unlinkError) {
              console.error(`Error deleting file ${fileName}:`, unlinkError);
              resolve(data.Location);
            } else {
              resolve(data.Location); // resolve promise with the file location
            }
          });
        }
      });
    });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return error;
  }
};

module.exports = {
uploader: uploader,
};