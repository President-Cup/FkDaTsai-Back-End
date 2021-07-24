const router = require("express").Router();

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

router.post("/", async (req, res) => {
  res.status(200).json({ success: false, msg: "This is /api/v1/signin" });
});

module.exports = router;
