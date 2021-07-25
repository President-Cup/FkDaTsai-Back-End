const router = require("express").Router();
const userDb = require("../../db/user");

/**
 * Create a new account.
 * @param {object} req - JSON object that contains the user's information.
 * @returns {}
 */
router.post("/", async (req, res) => {
  const isUserExists = await userDb.isUserExists(req.body.userMail)  
  if (isUserExists) {
    // User exists, abort operation.
    return res.status(400).json({ success: false, message: "User already exists." });
  }

  console.log("here");

  const result = await userDb.createUser(req.body);
  console.log(result);

  return res
    .status(201)
    .json({ success: true, message: "User created successfully." });
});

module.exports = router;
