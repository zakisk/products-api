// productService.js
const ProductRepository = require("../repositories/productRepository");

class ProductService {
  async createProduct(product) {
    return ProductRepository.createProduct(product);
  }

  async getAllProducts() {
    return ProductRepository.getAllProducts();
  }

  async getProductById(productId) {
    return ProductRepository.getProductById(productId);
  }

  async updateProduct(productId, updatedProduct) {
    return ProductRepository.updateProduct(productId, updatedProduct);
  }

  async deleteProduct(productId) {
    return ProductRepository.deleteProduct(productId);
  }
}

module.exports = new ProductService();
