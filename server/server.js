const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); 
const productRoutes = require('./routes/productRoutes'); 

const app = express();

// Load environment variables
dotenv.config();

const port = process.env.PORT || 5000;  

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use product routes
app.use('/api', productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
