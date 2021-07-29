const router = require("express").Router();
const { pool } = require("../../db/db");

//Post new item
router.post("/", async (req, res) => {
    const client = await pool.connect();
    try {
        const { categoryId } = req.body;
        const { categorySubId } = req.body;
        const { itemName } = req.body;
        const { description } = req.body;
        const { imageUrl } = req.body;
        const { price } = req.body;
        const { cityId } = req.body;
        const { districtId } = req.body;
        const { userId } = req.body;

        const createCategory = await client.query('INSERT INTO item (user_id, category_id, category_sub_id, city_id, district_id, item_name, description, image_url, price) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [userId, categoryId, categorySubId, cityId, districtId, itemName, description, imageUrl, price]);
        //res.json(createCategory.rows[0]);
        res.json(createCategory);
    } catch (err) {
        console.error(err.message)
    }
});


module.exports = router;

