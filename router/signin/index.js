const router = require("express").Router();
const bcrypt = require("bcrypt");
const userDb = require("../../db/user");
const jwt = require("jsonwebtoken");
const { jwtOptions } = require("../../config/passport");

/**
 * Main sign in api.
 */
router.post("/", async (req, res) => {
  const { userMail, userPassword } = req.body;

  // Check if email and password are provided
  if (!userMail || !userPassword) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  let user;

  // Authenticate user
  try {
    user = await userDb.findUserByMail(userMail);

    // User not found.
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Password not match.
    await bcrypt.compare(userPassword, user.user_password).then((result) => {
      if (!result) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }
    });

    // Calculate the seconds between the current time and the midnight.
    let currrentTimeStamp = Math.round(+new Date() / 1000);
    let midnightTimeStamp = new Date();
    midnightTimeStamp.setHours(23, 59, 59, 0);
    let expireIn = Math.round(midnightTimeStamp / 1000) - currrentTimeStamp;

    // Create a token with the user id, and set the expire time to midnight.
    let payload = { userid: user.user_id };
    let token = jwt.sign(payload, jwtOptions.secretOrKey, {
      expiresIn: expireIn,
    });

    // Return the token.
    return res.status(200).json({
      success: true,
      message: "Successfully signed in.",
      token: "Bearer " + token,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error signing in." });
  }
});


/**
 * Authorization test router, ACCESS LEVEL = Doge (1)
 */
// router.get(
//   "/doge",
//   passport.authenticate("jwt", { session: false }),
//   allowOnly(userRole.accessLevels.doge, async (req, res) => {
//     res.json("Welcome back, doge!");
//   })
// );

/**
 * Authorization test router, ACCESS LEVEL = Doge King (3)
 */
// router.get(
//   "/dogeKing",
//   passport.authenticate("jwt", { session: false }),
//   allowOnly(userRole.accessLevels.dogeKing, async (req, res) => {
//     res.json("Welcome back, my king!");
//   })
// );

module.exports = router;
