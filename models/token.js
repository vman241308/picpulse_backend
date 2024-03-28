const db = require("../config/database");
const {
  createNewTokenQuery,
  findTokenByUserIdQuery,
  deleteTokenQuery,
  updateTokenQuery,
} = require("../database/queries");
const { logger } = require("../utils/logger");

class Token {
  static create(newToken, cb) {
    db.query(
      createNewTokenQuery,
      [newToken.user_id, newToken.token],
      (err, res) => {
        if (err) {
          logger.error(err.message);
          cb(err, null);
          return;
        }
        cb(null, {
          id: res.insertId,
        });
      }
    );
  }

  static getByUserId(user_id, cb) {
    db.query(findTokenByUserIdQuery, user_id, (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      if (res.length) {
        cb(null, res);
        return;
      }
      cb(null, null);
    });
  }

  static delete(token, cb) {
    db.query(deleteTokenQuery, token, (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      cb(null, { msg: "success" });
    });
  }

  static update(data, cb) {
    db.query(updateTokenQuery, [data.token, data.id], (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      cb(null, { msg: "success" });
    });
  }
}

module.exports = Token;
