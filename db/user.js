const { pool } = require("./db");

async function createUser(userDetails) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const insertUserText =
      "INSERT INTO users(user_name, user_mail, user_password) VALUES ($1, $2, $3);";
    const insertUserParams = [
      userDetails.userName,
      userDetails.userMail,
      userDetails.userPassword,
    ];

    const result = await client.query(insertUserText, insertUserParams);

    await client.query("COMMIT");
    console.log(result);
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
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

module.exports = {
  createUser,
  isUserExists,
};
