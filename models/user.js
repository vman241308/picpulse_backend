const db = require("../config/database");
const {
  createNewUserQuery,
  findUserByEmailQuery,
  findUserByIdQuery,
  updateProfileQuery,
  updatePasswordQuery,
  setVerifiedQuery,
  resetPasswordQuery,
} = require("../database/queries");
const { logger } = require("../utils/logger");

class User {
  constructor(firstName, lastBame, email, password, DOB, avatar) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.DOB = DOB;
    this.avatar = avatar;
    this.verified = 0;
  }

  static create(newUser, cb) {
    db.query(
      createNewUserQuery,
      [
        newUser.firstname,
        newUser.lastname,
        newUser.email,
        newUser.password,
        newUser.DOB,
        newUser.avatar,
        newUser.verified,
      ],
      (err, res) => {
        if (err) {
          logger.error(err.message);
          cb(err, null);
          return;
        }
        cb(null, {
          id: res.insertId,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
        });
      }
    );
  }

  static setVerified(data, cb) {
    db.query(setVerifiedQuery, [data.verified, data.id], (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      cb(null, { msg: "success" });
      return;
    });
  }

  static findUserByEmail(email, cb) {
    db.query(findUserByEmailQuery, email, (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      if (res.length) {
        cb(null, res[0]);
        return;
      }
      cb({ kind: "not_found" }, null);
    });
  }

  static findUserById(id, cb) {
    db.query(findUserByIdQuery, id, (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      if (res.length) {
        cb(null, res[0]);
        return;
      }
      cb({ kind: "not_found" }, null);
    });
  }

  //   static updateProfile(data, cb) {
  //     db.query(
  //       updateProfileQuery,
  //       [data.firstName, data.lastName, data.email, data.id, data.id],
  //       (err, res) => {
  //         if (err) {
  //           logger.error(err.message);
  //           cb(err, null);
  //           return;
  //         }
  //         if (res.length) {
  //           cb(null, res[1][0]);
  //           return;
  //         }
  //         cb({ kind: "not_found" }, null);
  //       }
  //     );
  //   }

  static updatePassword(data, cb) {
    db.query(updatePasswordQuery, [data.hashedNewPwd, data.id], (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      cb(null, { msg: "success" });
      return;
    });
  }

  static resetPassword(data, cb) {
    db.query(
      resetPasswordQuery,
      [data.hashedNewPwd, data.email],
      (err, res) => {
        if (err) {
          logger.error(err.message);
          cb(err, null);
          return;
        }
        cb(null, { msg: "success" });
        return;
      }
    );
  }
}

module.exports = User;
