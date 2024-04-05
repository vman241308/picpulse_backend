const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

// const authRoute = require("./routes/auth.route");
const editorRoute = require("./routes/editor");

const { httpLogStream } = require("./utils/logger");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(morgan("combined", { stream: httpLogStream }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// app.use("/api/auth", authRoute);
app.use("/api/editor", editorRoute);
app.get("/api/test", (req, res) => {
  res.json({
    status: "success",
    message: "Test endpoint working fine!",
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
  next();
});

module.exports = app;
