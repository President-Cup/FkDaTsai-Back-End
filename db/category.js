const { pool } = require("./db");

/**
 * Get all categories
 */
async function getAllCategory() {
  const client = await pool.connect();
  const findCategoryText = "SELECT * FROM category";

  let result;

  try {
    result = await client.query(findCategoryText);
  } catch (err) {
    throw err;
  } finally {
    client.release();
    return result;
  }
}

async function getSubCategory(categoryId) {
  const client = await pool.connect();
  const findSubCategoryText =
    "SELECT * FROM category_sub WHERE category_id = $1";

  let result;

  try {
    result = await client.query(findSubCategoryText, [categoryId]);
  } catch (err) {
    throw err;
  } finally {
    client.release();
    return result;
  }
}

module.exports = {
  getAllCategory,
  getSubCategory,
};
