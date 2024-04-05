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

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: "myFile.txt",
    Body: fs.createReadStream(path.join(__dirname, `public/${fileName}`)),
  };

  s3.upload(params, (err, data) => {
    if (err) {
      return "Error uploading file:", err;
    } else {
      return data.Location;
    }
  });
};

module.exports = {
  uploader: uploader,
};
