import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing React Router components
import { useSelector } from 'react-redux'; // For accessing Redux state
import './App.css'; // Importing CSS for styling
import NavBar from './Components/NavBar'; // Importing NavBar component
import ProductList from './Components/ProductList'; // Importing ProductList component
import CartPage from './Components/CartPage'; // Cart Page component
import WishlistPage from './Components/WishlistPage'; // Wishlist page component
import ProductDetails from './Components/ProductDetails'; // Importing ProductDetails component
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer'; // Import Footer component

function App() {
  const cart = useSelector((state) => state.carts?.length || 0); // Safe check with default value
  const wishlist = useSelector((state) => state.wishlist?.length || 0); // Safe check with default value

  return (
    <Router>
      <div className="App">
        {/* Pass cartCount and wishlistCount to NavBar */}
        <NavBar cartCount={cart} wishlistCount={wishlist} /> 

        {/* Define Routes for different pages */}
        <div className="content-container">
          <Routes>
            <Route path="/" element={<ProductList />} /> {/* Home page showing product list */}
            <Route path="/cart" element={<CartPage />} /> {/* Cart page */}
            <Route path="/wishlist" element={<WishlistPage />} /> {/* Wishlist page */}
            <Route path="/product/:productId" element={<ProductDetails />} /> {/* Product details page */}
          </Routes>
        </div>

        {/* Footer component placed at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
