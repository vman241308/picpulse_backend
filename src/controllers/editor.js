const { spawn, exec } = require("child_process");
const { uploader } = require("../utils/uploader");

const processBgFg = async (req, res) => {
  const uploadResult = await uploader("videoshot.mp4");
  res.send({
    statusCode: 200,
    message: uploadResult,
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
};

module.exports = {
  processBgFg: processBgFg,
};
