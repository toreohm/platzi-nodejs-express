const express = require("express");
const {faker} = require("@faker-js/faker");

const router = express.Router();

router.get("/:categoriaId/productos/:productoId", (req, res) => {
  const {categoriaId, productoId} = req.params;
  res.json({
    categoriaId,
    productoId,
    name: "Chess",
    price: 0,
    available: true
  });
});

module.exports = router;

