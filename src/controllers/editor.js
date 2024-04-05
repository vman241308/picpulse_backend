const { spawn, exec } = require("child_process");
const uploader = require("../utils/uploader");

const processBgFg = async (req, res) => {
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
    const processedFileLink = await uploader(res.body.fileName);
    res.send({
      statusCode: 200,
      message: processedFileLink,
    });
  });
};

module.exports = {
  processBgFg: processBgFg,
};
