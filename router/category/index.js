const router = require("express").Router();
// const { pool } = require("../../db/db");
const categoryDb = require("../../db/category");

/**
 * Get all the category
 */
router.get("/", async (req, res) => {
  let result = await categoryDb.getAllCategory();
  return res.status(200).json(result.rows);
});

/**
 * Get all the subcategories in the specific category
 */
router.get("/subcategory", async (req, res) => {
  try {
    const { categoryId } = req.body;
    const allSubCategory = await pool.query(
      "SELECT * FROM category_sub WHERE category_id = $1",
      [categoryId]
    );
    res.json(allSubCategory.rows);
    const rows = allSubCategory.rows;
    res.send(JSON.stringify(rows));
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
