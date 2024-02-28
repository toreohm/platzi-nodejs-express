const express = require("express");
const productsRouter = require("./products");
const usersRouter = require("./users");
const categoriesRouter = require("./categories");

function routerApi (app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/productos", productsRouter);
  router.use("/users", usersRouter);
  router.use("/categorias", categoriesRouter);
}

module.exports.routerApi =  routerApi;
