const express = require("express");
const router = express.Router();
const Article = require("../models/article");

router.get("/articles", async (req, res) => {
  try {
    console.log("Fetching articles from database...");
    const articles = await Article.find({});
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
