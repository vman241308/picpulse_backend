// const Joi = require("joi");
// const validatorHandler = require("../middlewares/validatorHandler");

// const signup = (req, res, next) => {
//   const schema = Joi.object().keys({
//     email: Joi.string().trim().email().required(),
//     first_name: Joi.string().trim().alphanum().min(2).max(50).required(),
//     last_name: Joi.string().trim().alphanum().min(2).max(50).required(),
//     birthdate: Joi.date().format('YYYY-MM-DD').max("now").required(),
//     password: Joi.string()
//       .trim()
//       .min(6)
//       .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{6,30}$"))
//       .required(),
//   });
//   validatorHandler(req, res, next, schema);
// };

// const signin = (req, res, next) => {
//   const schema = Joi.object().keys({
//     email: Joi.string().trim().email().required(),
//     password: Joi.string()
//       .trim()
//       .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{6,30}$"))
//       .required(),
//   });
//   validatorHandler(req, res, next, schema);
// };

// module.exports = {
//   signup,
//   signin,
// };
