const router = require("express").Router();

const editorController = require("../controllers/editor");

router.route("/").post(editorController.processBgFg);

router
  .route("/upload")
  .post(editorController.upload);


module.exports = router;
