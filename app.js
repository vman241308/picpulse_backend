require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
const path = require("path");
const cors = require('cors');
const { expressjwt: jwt } = require("express-jwt");
const authRoutes = require('./routes/authRoutes');
const app = express();
const sequelize = require("./config/database");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ methods: ["POST", "GET", "PUT", "DELETE"], origin: "*" }));

app.use(
  jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }).unless({
    path: [
      "/api/user/signup",
      "/api/user/signin"
    ],
  })
);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(err.status).send("");
    return;
  }
  next();
});

app.use('/api/user', authRoutes);

// sequelize
//   .sync()
//   .then(() => {
    app.listen(process.env.PORT);
    console.log("App listening on port " + process.env.PORT);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });