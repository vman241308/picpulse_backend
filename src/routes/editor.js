const router = require("express").Router();

const editorController = require("../controllers/editor");

router.route("/").post(editorController.processBgFg);

module.exports = router;
