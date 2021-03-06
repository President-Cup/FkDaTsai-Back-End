const { pool } = require("./db");
const bcrypt = require("bcrypt");

const saltRounds = 15;

async function createUser(userDetails) {
  const client = await pool.connect();

  let hashedPassword;
  let result;

  try {
    await client.query("BEGIN");

    await bcrypt.hash(userDetails.userPassword, saltRounds).then((hash) => {
      hashedPassword = hash;
    });

    const insertUserText =
      "INSERT INTO users(user_name, user_mail, user_password) VALUES ($1, $2, $3);";
    const insertUserParams = [
      userDetails.userName,
      userDetails.userMail,
      hashedPassword,
    ];

    result = await client.query(insertUserText, insertUserParams);

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
    return result.rowCount == 1;
  }
}

async function isUserExists(userMail) {
  const client = await pool.connect();
  const findUserText = "SELECT * FROM users WHERE user_mail = $1";

  let isUserExists;

  await client.query(findUserText, [userMail]).then((result) => {
    client.release();
    isUserExists = result.rowCount > 0;
  });

  return isUserExists;
}

async function findUserById(userId) {
  const client = await pool.connect();

  const findUserText = "SELECT * FROM users WHERE user_id = $1";
  const findUserParams = [userId];

  let user;

  try {
    await client.query(findUserText, findUserParams).then((result) => {
      if (result.rowCount > 0) {
        user = result.rows[0];
      }
    });
  } catch (err) {
    throw err;
  } finally {
    client.release();
    return user;
  }
}

async function findUserByMail(userMail) {
  const client = await pool.connect();

  const findUserText = "SELECT * FROM users WHERE user_mail = $1";
  const findUserParams = [userMail];

  let user;

  try {
    await client.query(findUserText, findUserParams).then((result) => {
      if (result.rowCount > 0) {
        user = result.rows[0];
      }
    });
  } catch (err) {
    throw err;
  } finally {
    client.release();
    return user;
  }
}

module.exports = {
  createUser,
  isUserExists,
  findUserById,
  findUserByMail,
};
