const express = require("express");
const router = express.Router();
const Article = require("../models/article");

router.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/articles/:id', async (req, res) => {
  try {
      const article = await Article.findByIdAndDelete(req.params.id);
      if (!article) {
          return res.status(404).json({ message: 'Article not found' });
      }
      res.json({ message: 'Article deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;
