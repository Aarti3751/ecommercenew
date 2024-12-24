const Product = require('../models/Product');  // Import the Product model 
const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;  // Get search and category filters from query params

    // Build a dynamic query object
    let query = {};

    // Apply search filter if provided
    if (search) {
      // Use regular expression to perform a case-insensitive search
      query.name = { $regex: search, $options: 'i' };  // Searching by name (case-insensitive)
      // Optionally, you can also add a search filter on description if needed:
      // query.description = { $regex: search, $options: 'i' };
    }

    // Apply category filter if provided
    if (category) {
      query.category = category;  // Filter by category
    }

    // Fetch products from the database based on the constructed query
    const products = await Product.find(query);

    res.status(200).json(products);  // Return the filtered products
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle errors
  }
};


// Get product by ID
const getProductDetails = async (req, res) => {
  const { id } = req.params; // Get the product ID from the route parameters
  try {
    const product = await Product.findById(id);  // Find the product by ID in the database
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });  // Handle case if product is not found
    }
    res.status(200).json(product);  // Return the found product details
  } catch (error) {
    res.status(500).json({ message: error.message });  // Handle any errors
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, price, category, image, description } = req.body; // Accept description
  try {
    const newProduct = new Product({ name, price, category, image, description }); // Include description
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, image, description } = req.body; // Accept description
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id, 
      { name, price, category, image, description }, // Include description in update
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductDetails, createProduct, updateProduct, deleteProduct };
