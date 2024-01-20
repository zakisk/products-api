// productController.js
const express = require("express");
const ProductService = require("../services/productService");
const verifyToken = require("../middlewares/auth");

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, description, price, inventory } = req.body;

    const product = {
      name: name,
      description: description,
      price: price,
      inventory: inventory,
    };

    const result = await ProductService.createProduct(product);
    if (result.affectedRows) {
      res.json({ success: true, message: "product is added successfully" });
    } else {
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await ProductService.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;

    await ProductService.updateProduct(productId, updatedProduct);

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    await ProductService.deleteProduct(productId);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
// Bearer eyJhbGciOiJIUzI1NiJ9.MQ.cEujRDAQ1KIHTsSFwofwDtoFtvLvejY_qFg3smuFKp8
