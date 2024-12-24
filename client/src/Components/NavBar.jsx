import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Import the icons from react-icons
import { Link } from 'react-router-dom'; // Import Link for navigation
import { setSearchTerm, setCategoryFilter } from '../Store/Slices/searchFilterSlice'; // Import Redux actions
import './NavBar.css';

const NavBar = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  // Get cart and wishlist items count from Redux store
  const cartItemsCount = useSelector((state) => state.cart.length);
  const wishlistItemsCount = useSelector((state) => state.wishlist.length);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    dispatch(setSearchTerm(e.target.value));  // Dispatch the search term to Redux
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    dispatch(setCategoryFilter(e.target.value));  // Dispatch the category filter to Redux
  };

  return (
    <nav className="navbar">
      {/* Left: Brand Name */}
      <div className="brand-name">
        <h1>Shopping Cart</h1>
      </div>

      {/* Middle: Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Right: Cart Count Icon and Wishlist Count Icon */}
      <div className="icons">
        <Link to="/cart" className="icon">
          <FaShoppingCart size={24} />
          <span className="badge">{cartItemsCount}</span>
        </Link>
        
        <Link to="/wishlist" className="icon">
          <FaHeart size={24} />
          <span className="badge">{wishlistItemsCount}</span>
        </Link>
      </div>

      {/* Category Filter Dropdown */}
      <div className="filter">
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Men's Clothing">Men's Clothing</option>
          <option value="women's Clothing">Women's Clothing</option>
        </select>
      </div>
    </nav>
  );
};

export default NavBar;
