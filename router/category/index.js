const router = require("express").Router();
const { pool } = require("../../db/db");

//Create new category
router.post("/", async (req, res) => {
    const client = await pool.connect();
    try {
        const { categoryName } = req.body;
        const createCategory = await client.query("INSERT INTO category (category_name) VALUES ($1)",
            [categoryName]);
        res.json(createCategory.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

//Get all the category
router.get("/", async (req, res) => {
    try {
        const allCategory = await pool.query("SELECT * FROM category");
        res.json(allCategory.rows);
        const rows = allCategory.rows
        res.send(JSON.stringify(rows))
    } catch (err) {
        console.error(err.message);
    }
});

//Get all the subcategories in the specific category
router.get("/subcategory", async (req, res) => {
    try {
        const { categoryId } = req.body;
        const allSubCategory = await pool.query("SELECT * FROM category_sub WHERE category_id = $1",
            [categoryId]);
        res.json(allSubCategory.rows);
        const rows = allSubCategory.rows
        res.send(JSON.stringify(rows))
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;

