const router = require("express").Router();
const categoryDb = require("../../db/category");

// TODO: Error handling

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
  const { categoryId } = req.body;
  let result = await categoryDb.getSubCategory(categoryId);
  return res.status(200).json(result.rows);
});

module.exports = router;
