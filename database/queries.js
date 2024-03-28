const { DB_NAME } = require("../utils/secrets");

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUsers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?, ?, ?, NOW())
`;

const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;

const findUserById = `
SELECT * FROM users WHERE id = ?
`;

const updateProfile = `
UPDATE users SET firstname=?, lastname=?, email=? WHERE id = ?;
SELECT * FROM users WHERE id = ?;
`;

const updatePassword = `
UPDATE users SET password=? WHERE id = ?;
`;

const resetPassword = `
UPDATE users SET password=? WHERE email = ?;
`;

const createNewBot = `
INSERT INTO bots VALUES(?, ?, ?, ?, null, ?, ?, NOW());
`;

const findByName = `
SELECT * FROM bots WHERE bot_name = ?
`;

const getAllTrainDataByBot = `
SELECT * FROM traindatas WHERE bot_id = ?
`;

const createTrainData = `
INSERT INTO traindatas VALUES(?, ?, ?, ?, ?, 0, ?, NOW());
`;

const delBotById = `
DELETE FROM bots WHERE id = ?
`;

const delTrainDataByBotid = `
SELECT id FROM traindatas WHERE bot_id = ?;
DELETE FROM traindatas WHERE bot_id = ?;
`;

const getTrainDataById = `
SELECT * FROM traindatas WHERE id = ?
`;

const delTrainDataById = `
DELETE FROM hoqs WHERE traindata_id = ?;
DELETE FROM mcqs WHERE traindata_id = ?;
DELETE FROM chunks WHERE traindata_id = ?;
DELETE FROM traindatas WHERE id = ?;
UPDATE traindatas SET is_trained = 0 WHERE bot_id = ?;
SELECT * FROM traindatas WHERE bot_id = ?;
`;

const delTrainDataByIdOnly = `
DELETE FROM hoqs WHERE traindata_id = ?;
DELETE FROM mcqs WHERE traindata_id = ?;
DELETE FROM chunks WHERE traindata_id = ?;
DELETE FROM traindatas WHERE id = ?;
`;

const getBotById = `
SELECT * FROM bots WHERE id = ?
`;

const changeIsTrainedById = `
UPDATE traindatas SET is_trained = ? WHERE id = ?;
`;

const getChunks = `
SELECT * FROM chunks WHERE traindata_id = ? AND level = ? AND isMCQ = ?;
`;

const createChunkRec = `
INSERT INTO chunks VALUES(NULL, ?, ?, ?, ?);
`;

const updateChunkRec = `
UPDATE chunks SET chunk_nums = ? WHERE traindata_id = ? AND level = ? AND isMCQ = ?;
`;

const delChunk = `
DELETE FROM chunks WHERE traindata_id = ? AND level = ? AND isMCQ = ?;
`;

const changeBot = `
UPDATE bots SET bot_name=?, description=? WHERE id = ?;
`;

const isActive = `
SELECT COUNT(*) as cnt FROM traindatas WHERE bot_id=?
`;

const search = `
SELECT * FROM bots WHERE bot_name LIKE ? OR description LIKE ?;
`;

const createNewToken = `
INSERT INTO tokens VALUES(NULL, ?, ?);
`;

const findTokenByUserId = `
SELECT * FROM tokens WHERE user_id=?;
`;

const deleteToken = `
DELETE FROM tokens WHERE token=?;
`;

const setVerified = `
UPDATE users SET verified=? WHERE id = ?;
`;

const updateToken = `
UPDATE tokens SET token=? WHERE user_id = ?;
`;

const createNewOTP = `
INSERT INTO otps VALUES(NULL, ?, ?, ?);
`;

const findOTPByEmail = `
SELECT * FROM otps WHERE email=?;
`;

const deleteOTP = `
DELETE FROM otps WHERE email=?;
`;

const updateOTP = `
UPDATE otps SET otp=?, exp=? WHERE email = ?;
`;

module.exports = {
  createDBQuery: createDB,
  dropDBQuery: dropDB,
  createTableUsersQuery: createTableUsers,
  createNewUserQuery: createNewUser,
  findUserByEmailQuery: findUserByEmail,
  findUserByIdQuery: findUserById,
  updateProfileQuery: updateProfile,
  updatePasswordQuery: updatePassword,
  resetPasswordQuery: resetPassword,
  createNewBotQuery: createNewBot,
  findByNameQuery: findByName,
  getAllTrainDataByBotQuery: getAllTrainDataByBot,
  createTrainDataQuery: createTrainData,
  delBotByIdQuery: delBotById,
  delTrainDataByBotidQuery: delTrainDataByBotid,
  getTrainDataByIdQuery: getTrainDataById,
  delTrainDataByIdQuery: delTrainDataById,
  getBotByIdQuery: getBotById,
  changeIsTrainedByIdQuery: changeIsTrainedById,
  delTrainDataByIdOnlyQuery: delTrainDataByIdOnly,
  getChunksQuery: getChunks,
  createChunkRecQuery: createChunkRec,
  updateChunkRecQuery: updateChunkRec,
  delChunkQuery: delChunk,
  changeBotQuery: changeBot,
  isActiveQuery: isActive,
  searchQuery: search,
  findTokenByUserIdQuery: findTokenByUserId,
  deleteTokenQuery: deleteToken,
  createNewTokenQuery: createNewToken,
  setVerifiedQuery: setVerified,
  updateTokenQuery: updateToken,
  createNewOTPQuery: createNewOTP,
  findOTPByEmailQuery: findOTPByEmail,
  deleteOTPQuery: deleteOTP,
  updateOTPQuery: updateOTP,
};
