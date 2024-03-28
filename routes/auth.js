const express = require("express");
const authController = require("../controllers/auth");
const authValidators = require("../validators/auth");
const router = express.Router();

router.post("/signup", authValidators.signUpValidator, authController.signUp);
router.post("/signin", authValidators.signInValidator, authController.signIn);

module.exports = router;
