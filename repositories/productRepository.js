// productRepository.js
const ProductModel = require("../models/productModel");

class ProductRepository {
  createProduct(product) {
    return ProductModel.createProduct(product);
  }

  getAllProducts() {
    return ProductModel.getAllProducts();
  }

  getProductById(productId) {
    return ProductModel.getProductById(productId);
  }

  updateProduct(productId, updatedProduct) {
    return ProductModel.updateProduct(productId, updatedProduct);
  }

  deleteProduct(productId) {
    return ProductModel.deleteProduct(productId);
  }
}

module.exports = new ProductRepository();
