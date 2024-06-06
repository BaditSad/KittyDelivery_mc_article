const usersRouter = require("./controllers/UserController");
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const port = 3002;

app.use(cors());

//Ici on envoit les infos vers le front

app.use("/", usersRouter);

app.listen(port, () => console.log(`app running on http://localhost:${port}`));