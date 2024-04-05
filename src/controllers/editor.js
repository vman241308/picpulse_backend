const { spawn, exec } = require("child_process");
const { uploader } = require("../utils/uploader");

const processBgFg = async (req, res) => {
  try {
    console.log("ffmpeg " + req.body.command.join(" "));
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
      const uploadResult = await uploader(req.body.fileName);
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

module.exports = {
  processBgFg: processBgFg,
};
