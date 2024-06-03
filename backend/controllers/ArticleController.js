const express = require("express");
const router = express.Router();
module.exports = router;
const Article = require("../models/article");

router.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/articles/:articleId", async (req, res) => {
  const { articleId } = req.params;
  try {
    const article = await Article.findByIdAndDelete({ article_id: articleId });
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/articles", async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).send(article);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    await article.save();
    res.json(article);
  } catch (error) {
    res.status(400).send(error);
  }
});
