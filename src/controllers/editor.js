const { exec } = require("child_process");

const processBgFg = async (req, res) => {
  res.send(req.body);
  // exec(
  //   `ffmpeg -stream_loop -1 -i ${req.body.backGround} -stream_loop -1 -i ${req.body.foreGround} -filter_complex ${filter_complex} -map [out] -r 30 -c:a copy -t 2.493 -preset ultrafast output_1711964804504.mp4`,
  //   (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`error: ${error.message}`);
  //       return;
  //     }

  //     if (stderr) {
  //       console.error(`stderr: ${stderr}`);
  //       return;
  //     }

  //     console.log(`stdout:\n${stdout}`);
  //   }
  // );
};

module.exports = {
  processBgFg: processBgFg,
};
