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

module.exports = {
  getAllCategory,
};
