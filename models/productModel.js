// productModel.js
const db = require("../data/db.js");

class ProductModel {
  async createProduct(product) {
    const query = `INSERT INTO products (name, description, price, inventory) VALUES (?, ?, ?, ?)`;
    const values = [
      product.name,
      product.description,
      product.price,
      product.inventory,
    ];

    const [result] = await db.query(query, values);
    return result;
  }

  async getAllProducts() {
    const [rows] = await db.query("SELECT * FROM products");
    return rows;
  }

  async getProductById(productId) {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [
      productId,
    ]);
    return rows[0];
  }

  async updateProduct(productId, updatedProduct) {
    try {
      const result = await db.query("UPDATE products SET ? WHERE id = ?", [
        updatedProduct,
        productId,
      ]);
      if (result.affectedRows > 0) {
        return { success: true, message: "Product updated successfully" };
      } else {
        return { success: false, message: "Product not found or not updated" };
      }
    } catch (error) {
      return {
        success: false,
        message: `Error updating product: ${error.message}`,
      };
    }
  }

  async deleteProduct(productId) {
    try {
      const result = await db.query("DELETE FROM products WHERE id = ?", [
        productId,
      ]);
      if (result.affectedRows > 0) {
        return { success: true, message: "Product deleted successfully" };
      } else {
        return { success: false, message: "Product not found or not deleted" };
      }
    } catch (error) {
      return {
        success: false,
        message: `Error deleting product: ${error.message}`,
      };
    }
  }
}

module.exports = new ProductModel();
