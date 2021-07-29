const router = require("express").Router();
const { pool } = require("../../db/db");
const itemDb = require("../../db/item");

// TODO: Erroe handling

/**
 * Post new item
 */
router.post("/", async (req, res) => {
    const request = req.body;
    const isCreateSuccess = await itemDb.createNewItem(request);

    if (isCreateSuccess) {
      return res
        .status(201)
        .json({ success: true, message: "Item created." });
    } else {
        return res
          .status(500)
          .json({ success: false, message: "We fucked up." });
    }
});


module.exports = router;

