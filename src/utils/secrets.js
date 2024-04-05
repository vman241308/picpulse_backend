require("dotenv/config");

const { logger } = require("./logger");

const {
  JWT_SECRET_KEY,
  PORT,  
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,  
  MAILER_SERVICE,
  MAILER_HOST,
  MAILER_PORT,
  MAILER_SECURE,
  MAILER_USER,
  MAILER_PASSWORD,
  SUPPORT_EMAIL_ADDRESS,
} = process.env;

const requiredCredentials = [
  "JWT_SECRET_KEY",
  "PORT" ,
  "DB_HOST",
  "DB_PORT",
  "DB_DATABASE",
  "DB_USERNAME",
  "DB_PASSWORD",
  "MAILER_SERVICE",
  "MAILER_HOST",
  "MAILER_PORT",
  "MAILER_SECURE",
  "MAILER_USER",
  "MAILER_PASSWORD",
  "SUPPORT_EMAIL_ADDRESS",
];

for (const credential of requiredCredentials) {
  if (process.env[credential] === undefined) {
    logger.error(`Missing required crendential: ${credential}`);
    process.exit(1);
  }
}

module.exports = {
  JWT_SECRET_KEY,
  PORT,  
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,  
  MAILER_SERVICE,
  MAILER_HOST,
  MAILER_PORT,
  MAILER_SECURE,
  MAILER_USER,
  MAILER_PASSWORD,
  SUPPORT_EMAIL_ADDRESS,
};
