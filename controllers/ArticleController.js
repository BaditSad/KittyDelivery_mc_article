const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
module.exports = router;
const Article = require("../models/article");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "./storage")); 
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + '-' + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

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

router.post("/",upload.single('article_image'), async (req, res) => {
  try {
    const { restaurant_id, article_type, article_name, article_description, article_price } = req.body;
    const article = await Article.create({
      restaurant_id,
      article_type,
      article_name,
      article_description,
      article_price,
      article_image: "/storage/"+req.file.filename
    });
    await article.save();
    res.status(201).send(article);
  } catch (error) {
    
        res.status(400).send(error);
  }
});

router.put("/:articleId", async (req, res) => {
  try {
    let updateData = {
      restaurant_id: req.body.restaurant_id,
      article_type: req.body.article_type,
      article_name: req.body.article_name,
      article_description: req.body.article_description,
      article_price: req.body.article_price,
    };

    if (req.file) {
      updateData.article_image = req.file.path; 
    }
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
