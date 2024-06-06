var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var deliverySchema = new Schema({
  order_id: { type: Schema.Types.ObjectId, required: true },
  delivery_status: { type: String, required: true },
  delivery_date: { type: Date, required: true },
  delivery_person_id: { type: Number, required: false },
  qr_code: { type: String, required: true },
  restaurant_id: { type: Number, required: true }
});

module.exports = mongoose.model("Delivery", deliverySchema);

