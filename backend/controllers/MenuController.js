const express = require("express");
const router = express.Router();
module.exports = router;
const Menu = require("../models/menu");

router.get("/restaurants/:restaurantId/menus", async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const menus = await Menu.find({ restaurant_id: restaurantId });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/menus", async (req, res) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/menus/:id", async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/menus/:id", async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
