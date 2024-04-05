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
    await uploader(req.body.fileName)
      .then((result) => {
        res.send({
          statusCode: 200,
          message: result.body.path,
        });
      })
      .catch((error) => {
        console.log(`stderr : ${error}`);
      });
  });
};

module.exports = {
  processBgFg: processBgFg,
};
