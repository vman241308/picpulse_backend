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
    let { Email, Password } = req.body;
    // Check if the input parameters are empty
    if (!Email || !Password) {
      return res
        .status(400)
        .send({ message: "Input parameters cannot be empty." });
    }

    // validate email
    if (!validateEmail(Email)) {
      return res.status(400).send({ message: "Invalid email format." });
    }

    connection.query(
      "SELECT * FROM users WHERE Email = ?",
      [Email],
      async (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
          const comparison = await bcrypt.compare(
            Password,
            results[0].Password
          );
          if (comparison) {
            const UserID = results[0].UserID;
            const token = jwt.sign({ UserID }, process.env.JWT_SECRET, {
              expiresIn: "2h",
            });
            return res.status(200).send({
              message: "User logged in successfully",
              token: token,
            });
          } else {
            return res.status(401).json({
              message: "Password is incorrect",
            });
          }
        } else {
          return res.status(404).json({
            message: "User not found",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  signIn: signIn,
  signUp: signUp,
};
