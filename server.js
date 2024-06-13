const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const articlesRouter = require("./controllers/ArticleController");
const app = express();
const port = process.env.PORT || 3006;

app.use(cors());

const dbUrl = process.env.MONGO_URI || "mongodb://localhost:27017/kittydelivery";

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(bodyParser.json());
app.use("/", articlesRouter);

app.listen(port, () => console.log(`App running on http://localhost:${port}`));
