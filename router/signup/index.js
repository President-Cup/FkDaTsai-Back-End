const router = require("express").Router();
const userDb = require("../../db/user");

/**
 * Create a new account.
 * @param {object} req - JSON object that contains the user's information.
 * @returns {}
 */
router.post("/", async (req, res) => {
  const request = req.body;

  const isUserExists = await userDb.isUserExists(request.userMail);
  if (isUserExists) {
    // User exists, abort operation.
    return res
      .status(400)
      .json({ success: false, message: "User already exists." });
  }

  const result = await userDb.createUser(request);

  if (result) {
    return res
      .status(201)
      .json({ success: true, message: "User created successfully." });
  } else {
    return res
      .status(500)
      .json({ success: false, message: "Error creating user." });
  }
});

module.exports = router;
