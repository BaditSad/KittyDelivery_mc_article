var mongoose = require("mongoose");
var Order = require("./initMongo/models_copy/order");
var Notification = require("./initMongo/models_copy/notification");
var Menu = require("./initMongo/models_copy/menu");
var Article = require("./initMongo/models_copy/article");

var mongoDB = "mongodb://localhost:27017/kittydelivery";
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", async function () {
  console.log("Connected to MongoDB");

  try {
    await Order.deleteMany({});
    await Notification.deleteMany({});
    await Menu.deleteMany({});
    await Article.deleteMany({});
    console.log("Collections réinitialisées");

    let menus = [
      {
        restaurant_id: 1,
        menu_name: "Menu du Jour",
        article_list: ["Burger", "Frites", "Soda"],
        menu_price: 18.0,
        menu_description: "Un menu du jour varié et équilibré",
      },
      {
        restaurant_id: 2,
        menu_name: "Menu Italien",
        article_list: ["Pâtes", "Tiramisu"],
        menu_price: 19.0,
        menu_description: "Un menu italien classique et savoureux",
      },
      {
        restaurant_id: 3,
        menu_name: "Menu Végétarien",
        article_list: ["Salade", "Soupe", "Smoothie"],
        menu_price: 16.0,
        menu_description: "Un menu végétarien sain et délicieux",
      },
    ];

    await Menu.insertMany(menus);
    console.log("Menus insérés");

    let articles = [
      {
        article_name: "Burger",
        article_description: "Un délicieux burger",
        article_price: 10.0,
        restaurant_id: 1,
        article_type: "Plat principal",
      },
      {
        article_name: "Frites",
        article_description: "Frites croustillantes",
        article_price: 5.0,
        restaurant_id: 1,
        article_type: "Accompagnement",
      },
      {
        article_name: "Soda",
        article_description: "Boisson gazeuse",
        article_price: 3.0,
        restaurant_id: 1,
        article_type: "Boisson",
      },
      {
        article_name: "Pâtes",
        article_description: "Pâtes aux deux saumons",
        article_price: 13.0,
        restaurant_id: 2,
        article_type: "Plat principal",
      },
      {
        article_name: "Tiramisu",
        article_description: "Dessert italien classique",
        article_price: 6.0,
        restaurant_id: 2,
        article_type: "Dessert",
      },
      {
        article_name: "Salade",
        article_description: "Salade de légumes frais",
        article_price: 7.0,
        restaurant_id: 3,
        article_type: "Entrée",
      },
      {
        article_name: "Soupe",
        article_description: "Soupe de légumes",
        article_price: 5.0,
        restaurant_id: 3,
        article_type: "Entrée",
      },
      {
        article_name: "Smoothie",
        article_description: "Smoothie aux fruits",
        article_price: 4.0,
        restaurant_id: 3,
        article_type: "Boisson",
      },
    ];

    await Article.insertMany(articles);
    console.log("Articles insérés");

    let orders = [
      {
        user_id: 1,
        restaurant_id: 1,
        order_date: new Date(),
        order_status: "en cours",
        order_total_amount: 50.0,
        order_items: ["Burger", "Menu du Jour"],
        delivery_date: new Date(),
        delivery_person_id: 1,
        qr_code: "ABC123",
      },
      {
        user_id: 2,
        restaurant_id: 1,
        order_date: new Date(),
        order_status: "livré",
        order_total_amount: 75.0,
        order_items: ["Pâtes", "Menu Italien"],
        delivery_date: new Date(),
        delivery_person_id: 2,
        qr_code: "XYZ789",
      },
      {
        user_id: 3,
        restaurant_id: 2,
        order_date: new Date(),
        order_status: "annulé",
        order_total_amount: 20.0,
        order_items: ["Tiramisu", "Salade"],
        delivery_date: new Date(),
        delivery_person_id: 3,
        qr_code: "LMN456",
      },
    ];

    await Order.insertMany(orders);
    console.log("Commandes et livraisons insérées");

    let notifications = [
      {
        notification_type: "info",
        notification_message: "Votre commande est en cours de préparation.",
        notification_date: new Date(),
        user_id: 1,
      },
      {
        notification_type: "warning",
        notification_message: "Votre commande a été retardée.",
        notification_date: new Date(),
        user_id: 2,
      },
      {
        notification_type: "success",
        notification_message: "Votre commande a été livrée.",
        notification_date: new Date(),
        user_id: 2,
      },
      {
        notification_type: "error",
        notification_message: "Votre commande a été annulée.",
        notification_date: new Date(),
        user_id: 3,
      },
    ];

    await Notification.insertMany(notifications);
    console.log("Notifications insérées");
  } catch (err) {
    console.error(err);
  } finally {
    db.close();
  }
});
