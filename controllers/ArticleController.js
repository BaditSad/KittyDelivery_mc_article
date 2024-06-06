const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
module.exports = router;
const Article = require("../models/article");

router.get("/:restaurantId", async (req, res) => {
  try {
    const articles = await Article.find({
      restaurant_id: req.params.restaurantId,
    });
    if (!articles) {
      return res
        .status(404)
        .json({ message: "Articles not found for this restaurant!" });
    }
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:articleId", async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found!" });
    }
    res.json({ message: "Article deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const article = new Article(req.body);
    if (!article) {
      return res.status(404).json({ message: "Error while adding article!" });
    }
    await article.save();
    res.status(201).send(article);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:articleId", async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.articleId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!article) {
      return res.status(404).json({ message: "Article not found!" });
    }
    res.json(article);
  } catch (error) {
    res.status(400).send(error);
  }
});
