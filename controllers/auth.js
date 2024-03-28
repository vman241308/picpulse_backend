const connection = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

const User = require("../models/user");
const Token = require("../models/token.model");
const { hashPassword } = require("../utils/password");

function validateEmail(email) {
  var re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return re.test(email.toLowerCase());
}

const signUp = async (req, res) => {
  try {
    let userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      DOB: req.body.DOB,
      avatar: req.body.avatar,
    };

    const hashedPassword = hashPassword(userData.password.trim());

    const user = new User(
      userData.firstName.trim(),
      userData.lastName.trim(),
      userData.email.trim(),
      hashedPassword,
      userData.DOB,
      userData.avatar
    );
    // check if DOB is empty, if so set it to null
    User.create(user, (err, data) => {
      if (err) {
        res.status(500).send({
          message: `An unexpected error occurred: ${err.message}`,
        });
      } else {
        const token = generateToken(data, "15h");
        Token.create({ user_id: data.id, token }, async (err1, data1) => {
          if (err1) {
            res.status(500).send({
              status: "error",
              message: err1.message,
            });
          } else {
            const data = {
              from: MAILER_USER,
              to: email,
              subject: "Welcome to Quizbot",
              html: `<p>This link is to verify your email on QuizBot.com</p><p>Enjoy your QuizBot with just clicking this link </p><br /><a href="${SELF_URL}/verify?token=${token}">${SELF_URL}/verify?token=${token}</a>`,
            };
            const result = await Mailer.send(data);
            res.status(200).send({
              status: "User registered successfully",
              data: data,
            });
          }
        });
      }
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: `An unexpected error occurred: ${err.message}` });
  }
};

const signIn = async (req, res) => {
  try {
    let userData = {
      email: req.body.email,
      password: req.body.password,
    };

    User.findUserByEmail(userData.email, (err, user) => {
      if (err || !user) {
        return res.status(500).send({
          message: `User not found: ${err ? err.message : ""}`,
        });
      } else {
        let passwordIsValid = bcrypt.compareSync(
          userData.password,
          user.password
        );

        if (!passwordIsValid) {
          res.status(401).send({
            token: null,
            message: "Invalid password",
          });
          return;
        }

        const token = generateToken(user, "15h");
        res.status(200).send({
          status: "User signed in successfully",
          user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            DOB: user.DOB,
          },
          token: token,
        });
        return;
      }
    });
  } catch (err) {
    res.status(500).send({
      message: `An unexpected error occurred: ${err.message}`,
    });
    return;
  }
};

module.exports = {
  signIn: signIn,
  signUp: signUp,
};
