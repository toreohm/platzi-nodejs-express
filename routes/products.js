const express = require("express");
const ProductsService = require("./../services/products");
const validatorHandler = require("./../middlewares/validator.handler");
const {createProductSchema,updateProductSchema,getProductSchema} = require("./../schemas/product.schema");

const router = express.Router();
const service = new ProductsService();

router.get("/", async (req, res) => {
  const productos = await service.find();
  res.json(productos);
});

router.get("/filter", (req, res) => {
  res.end("Yo soy un filter");
});

router.get("/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const product = await service.findOne(id.trim());
      res.status(200).json(product);
      } catch(error) {
        next(error);
      }
  }
);

router.post("/",
  validatorHandler(createProductSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({
      message: "Created",
      ...newProduct
    });
  }
);

router.patch("/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const {id} = req.params;
      const product = await service.update(id, body);
      res.json({
        message: "Product Updated",
        product: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res, next) => {
try {
  const {id} = req.params;
  const rta =  await service.delete(id);
  res.json({
    message: "deleted",
    rta
  });
} catch(error) {
  next(error);
}
});

module.exports = router;
