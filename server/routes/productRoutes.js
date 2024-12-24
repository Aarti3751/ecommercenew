const express = require('express');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,getProductDetails
} = require('../controllers/productController');  // Ensure this is correctly importing

const router = express.Router();

// Define routes
router.get('/products', getProducts);           // Get all products
router.get('/:id', getProductDetails);
router.post('/add/products', createProduct);        // Create a new product
router.put('/products/:id', updateProduct);     // Update an existing product
router.delete('/products/:id', deleteProduct);  // Delete a product

module.exports = router;
