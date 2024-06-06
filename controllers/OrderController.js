const express = require("express");
const router = express.Router();
module.exports = router;
const Order = require("../models/order");

router.get("/restaurants/:restaurantId/orders", async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const orders = await Order.find({ restaurant_id: restaurantId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/restaurants/:restaurantId/order/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
