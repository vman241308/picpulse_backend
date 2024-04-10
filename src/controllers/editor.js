const { spawn, exec } = require("child_process");
const { uploader } = require("../utils/uploader");

const processBgFg = async (req, res) => {
  try {
    stream = spawn("ffmpeg", req.body.command);

    stream.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    stream.stderr.on("data", (data) => {
      console.log(`stderr : ${data}`);
    });

    stream.on("error", (error) => {
      res.send({
        statusCode: 500,
        message: error,
      });
    });

    stream.on("close", async (code) => {
      const uploadResult = await aspectRatioVideo(
        req.body.aspectCommand,
        req.body.fileName
      );

      res.send({
        statusCode: 200,
        message: uploadResult,
      });
    });
  } catch (error) {
    console.error(`Caught exception: ${error}`);
    res.send({
      statusCode: 500,
      message: error.message,
    });
  }
};

function aspectRatioVideo(command, fileName) {
  return new Promise((resolve, reject) => {
    try {
      stream = spawn("ffmpeg", command);

      stream.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });

      stream.stderr.on("data", (data) => {
        console.log(`stderr : ${data}`);
      });

      stream.on("error", (error) => {
        console.error(`Caught exception: ${error}`);
        reject(error);
      });

      stream.on("close", async (code) => {
        const uploadResult = await uploader(fileName);
        resolve(uploadResult);
      });
    } catch (error) {
      console.error(`Caught exception: ${error}`);
      reject(error);
    }
  });
}

module.exports = {
  processBgFg: processBgFg,
};
