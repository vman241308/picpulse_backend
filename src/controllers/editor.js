const { spawn, exec } = require("child_process");

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

  stream.on("close", (code) => {
    res.send({
      statusCode: 200,
      message: code,
    });
  });
};

module.exports = {
  processBgFg: processBgFg,
};
