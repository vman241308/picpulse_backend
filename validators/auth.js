const Joi = require("joi");
const validatorHandler = require("../middlewares/validatorHandler");

const signUp = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    firstname: Joi.string().trim().alphanum().min(2).max(50).required(),
    lastname: Joi.string().trim().alphanum().min(2).max(50).required(),
    password: Joi.string()
      .trim()
      .min(6)
      .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{6,30}$"))
      .required(),
  });
  validatorHandler(req, res, next, schema);
};

const signIn = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string()
      .trim()
      .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{6,30}$"))
      .required(),
  });
  validatorHandler(req, res, next, schema);
};

module.exports = {
  signUpValidator: signUp,
  signInValidator: signIn,
};
