var mongoose = require("mongoose");
var Article = require("./models/article");

var mongoDB = "mongodb://mongo:27017/kittydelivery";
mongoose.connect(mongoDB);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", async function () {
  console.log("Connected to MongoDB");

  try {
    await Article.deleteMany({});
    console.log("Articles collection cleared");

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
      {
        article_name: "Nuggets",
        article_description: "Nuggets de poulet croustillants",
        article_price: 7.0,
        restaurant_id: 1,
        article_type: "Plat principal",
      },
      {
        article_name: "Jus de fruits",
        article_description: "Assortiment de jus de fruits frais",
        article_price: 3.0,
        restaurant_id: 1,
        article_type: "Boisson",
      },
      {
        article_name: "Foie gras",
        article_description: "Foie gras poêlé sur toast",
        article_price: 18.0,
        restaurant_id: 2,
        article_type: "Entrée",
      },
      {
        article_name: "Filet mignon",
        article_description: "Filet mignon grillé avec sauce aux champignons",
        article_price: 30.0,
        restaurant_id: 2,
        article_type: "Plat principal",
      },
      {
        article_name: "Crème brûlée",
        article_description:
          "Dessert crémeux à la vanille avec croûte caramélisée",
        article_price: 9.0,
        restaurant_id: 2,
        article_type: "Dessert",
      },
      {
        article_name: "Sushi assortis",
        article_description: "Assortiment de sushi frais",
        article_price: 18.0,
        restaurant_id: 3,
        article_type: "Plat principal",
      },
      {
        article_name: "Pad Thai",
        article_description:
          "Plat de nouilles thaïlandaises épicées avec crevettes",
        article_price: 12.0,
        restaurant_id: 3,
        article_type: "Plat principal",
      },
      {
        article_name: "Mochi glacé",
        article_description: "Glace mochi traditionnelle japonaise",
        article_price: 6.0,
        restaurant_id: 3,
        article_type: "Dessert",
      },
      {
        restaurant_id: 1,
        article_type: "burger",
        article_name: "Burger",
        article_description: "Big Mac",
        article_price: 10,
        article_image: "/storage/1718553327336-.png",
      },
      {
        restaurant_id: 1,
        article_type: "burger",
        article_name: "burger",
        article_description: "burger",
        article_price: 10,
        article_image: "/storage/1718624371198-.png",
      },
      {
        restaurant_id: 1,
        article_type: "pizza",
        article_name: "Pizza",
        article_description: "pizza",
        article_price: 7,
        article_image: "/storage/1718625176462-.jpg",
      },
      {
          restaurant_id: 1,
          article_type: "hvhjvjhv",
          article_name: "vchjwsvdhcvqa",
          article_description: "hjvjhvjvhj",
          article_price: 6,
          article_image: "/storage/1718626009425-.png",
      },
      {
        
          restaurant_id: 3,
          article_type: "hjhvuh",
          article_name: "qewd",
          article_description: "uvuvuuv",
          article_price: 15,
          article_image: "/storage/1718628647893-.png",
        
      },
      {
        restaurant_id: 1,
        article_type: "hbuhbubuh",
        article_name: "shxbhsqbq",
        article_description: "bubububub",
        article_price: 15,
        article_image: "/storage/1718629549165-.png",
      },
      {
        
          restaurant_id: 1,
          article_type: "bhubuhbuhbu",
          rticle_name: "wduqbeub",
          article_description: "ubhubuhbuhbu",
          article_price: 17,
          article_image: "/storage/1718629619468-.png",
        
      },
      {
        restaurant_id: 1,
        article_type: "burger",
        article_name: "Big mac",
        article_description: "burger",
        article_price: 12,
        article_image: "/storage/1718629815760-.png",
      },

    ];

    await Article.insertMany(articles);
    console.log("Articles inserted successfully");
  } catch (err) {
    console.error("Error inserting articles:", err);
  } finally {
    mongoose.connection.close();
  }
});
