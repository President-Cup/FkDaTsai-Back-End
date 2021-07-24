const router = require("express").Router();

router.get("/", (_, res) => res.status(418).send("API v1"));
router.use("/signin", require("./signin"));
router.use("/signup", require("./signup"));

module.exports = router;
