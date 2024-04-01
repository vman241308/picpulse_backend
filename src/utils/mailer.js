const nodemailer = require("nodemailer");
const { logger } = require("./logger");

const {
  MAILER_SERVICE,
  MAILER_HOST,
  MAILER_PORT,
  MAILER_SECURE,
  MAILER_USER,
  MAILER_PASS,
} = require("../utils/secrets");

const config = {
  service: MAILER_SERVICE || "Outlook365",
  host: MAILER_HOST || "smtp.office365.com",
  port: MAILER_PORT || 587,
  secure: MAILER_SECURE || false,
  auth: {
    user: MAILER_USER,
    pass: MAILER_PASS,
  },
};

const send = (data) => {

  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(data, (err, info) => {
    if (err) {
      logger.error(err.message);
      return err;
    } else return info.response;
  });
};
const mailer = { send };

module.exports = mailer;
