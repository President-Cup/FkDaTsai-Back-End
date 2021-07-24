const router = require("express").Router();

router.post("/", async (req, res) => {
  res.status(200).json({ success: false, msg: "This is /api/v1/signup" });
});

module.exports = router;
