const express = require("express");
const router = express.Router();
module.exports = router;
const Article = require("../models/article");

router.get("/:restaurantId", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const articles = await Article.find({
      restaurant_id: req.params.restaurantId,
    })
      .skip(skip)
      .limit(limit);

    const totalArticles = await Article.countDocuments({
      restaurant_id: req.params.restaurantId,
    });

    if (!articles) {
      return res.status(404).json({ message: "Not found" });
    }

    if (articles.length === 0) {
      return res.status(201).json({ message: "Empty" });
    }

    res.status(201).json({
      totalPages: Math.ceil(totalArticles / limit),
      articles: articles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:articleId", async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.articleId);

    if (!article) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(201).json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const article = new Article(req.body);

    if (!article) {
      return res.status(404).json({ message: "Not found" });
    }

    await article.save();

    res.status(201).json({ message: "Item posted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      return res.status(404).json({ message: "Not found!" });
    }

    res.status(201).json({ message: "Item updated" });
  } catch (error) {
    res.status(400).send(error);
  }
});
