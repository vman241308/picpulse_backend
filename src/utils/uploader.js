const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

let directory = path.join(__dirname, "public");

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
          fs.readdir(directory, (err, files) => {
            if (err) throw err;

            for (let file of files) {
              fs.unlink(path.join(directory, file), (err) => {
                if (err) throw reject(err);
                resolve(data.Location);
              });
            }
          });
        }
      });
    });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return error;
  }
};

module.exports = {
  uploader: uploader,
};
