const router = require("express").Router();

router.get("/", (_, res) => res.status(418).send("API v1"));

module.exports = router;
