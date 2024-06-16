const articlesRouter = require("./controllers/ArticleController");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3006;

app.use(cors());

const db = require("./models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//Ici on envoit les infos vers le front

app.use(bodyParser.json());
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/storage", express.static(path.join(process.cwd(), "./storage")));
app.use("/", articlesRouter);

app.listen(port, () => console.log(`app running on http://localhost:${port}`));
