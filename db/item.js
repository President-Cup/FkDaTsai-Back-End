const { pool } = require("./db");

async function createNewItem(itemDetails) {
    const client = await pool.connect();

    let result;

    try {
      await client.query("BEGIN");

      const createNewItemText =
        "INSERT INTO item (user_id, category_id, category_sub_id, city_id, district_id, item_name, description, image_url, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
      const createNewItemParams = [
          itemDetails.userId,
          itemDetails.categoryId,
          itemDetails.categorySubId,
          itemDetails.cityId,
          itemDetails.districtId,
          itemDetails.itemName,
          itemDetails.description,
          itemDetails.imageUrl,
          itemDetails.price
        ];
        
      result = await client.query(createNewItemText, createNewItemParams);

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
      console.log(result)
      return result.rowCount == 1;
    }
}

module.exports = {
  createNewItem,
};
