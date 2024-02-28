const express = require("express");
const cors = require("cors");
const {routerApi} = require("./routes");
const {logErrors, errorHandler, boomErrorHandler} = require("./middlewares/error.handler");

const app = express();
const PORT = 3001;

app.use(express.json());
const whiteList = ["http://localhost:8080", "https://hectormaluy.w3spaces.com/"];
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido"));
    }
  }
};
app.use(cors(options));

app.get("/", (req, res) => {
  res.send("<p style='text-align:center;font-size:40px;color:lightblue;background-color:#000'>Mi primer servidor en Express</p>");
});

app.get("/nueva-ruta", (req, res) => {
  res.send("<p style='text-align:center;font-size:40px;color:mediumseagreen;background-color:#000'>Nueva ruta</p>");
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Escuchando en el puerto " + PORT);
});
