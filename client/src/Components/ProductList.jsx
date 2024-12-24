import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../Store/Slices/cart';
import { addToWishlist } from '../Store/Slices/wishlist';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setSearchTerm, setCategoryFilter } from '../Store/Slices/searchFilterSlice'; // Import Redux actions
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchTerm = useSelector((state) => state.search?.searchTerm || '');  // Use optional chaining to avoid undefined errors
  const categoryFilter = useSelector((state) => state.search?.category || '');  // Ensure category is handled safely
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to fetch products from the backend API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        search: searchTerm,
        category: categoryFilter,
      }).toString();

      const response = await axios.get(`http://localhost:4003/api/products?${query}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, categoryFilter]);

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
    navigate('/wishlist');
  };

  const handleCategoryFilter = (category) => {
    dispatch(setCategoryFilter(category)); // Corrected dispatch action
  };

  return (
    <Container fluid className="product-list-container">
      {/* Promo Banner */}
      <div className="promo-banner text-center my-4">
        <h3>🎉 Big Sale! Up to 50% Off on All Products 🎉</h3>
        <p>Hurry! Limited Time Offer</p>
      </div>

      <h2 className="text-center my-4">Our Products</h2>

      {/* Category Filter Images */}
      <div className="category-filter text-center mb-4">
        <img
          src="https://m.media-amazon.com/images/G/31/img22/Electronics/BAU/Page/Revamp/Creatives/ATF/Halos/Halos_300x300_1._CB612633941_.png"
          alt="Electronics"
          className="category-icon"
          onClick={() => handleCategoryFilter('Electronics')}
        />
        <img
          src="https://m.media-amazon.com/images/I/61Jx9DZ7sHL._SY879_.jpg"
          alt="Men's Clothing"
          className="category-icon"
          onClick={() => handleCategoryFilter("Men's Clothing")}
        />
        <img
          src="https://m.media-amazon.com/images/I/81T6YFiExMS._AC_UL480_FMwebp_QL65_.jpg"
          alt="Women's Clothing"
          className="category-icon"
          onClick={() => handleCategoryFilter("women's Clothing")}
        />
      </div>

      {/* Show loading spinner while fetching products */}
      {loading && (
        <div className="loading-spinner">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <Row>
        {products.length === 0 ? (
          !loading && <p>No products found.</p>
        ) : (
          products.map((product) => {
            const { name, _id, price, description, image, rating } = product;

            return (
              <Col md={3} sm={6} xs={12} key={_id} className="mb-4">
                <Card className="product-card">
                  <Link to={`/product/${_id}`} className="product-link">
                    <Card.Img variant="top" src={image} className="product-image" />
                  </Link>
                  <Card.Body>
                    {/* Product Badge (For example, "New", "Discounted", etc.) */}
                    <div className="product-badge">
                      {Math.random() > 0.5 ? (
                        <span className="badge new">New</span>
                      ) : (
                        <span className="badge sale">Sale</span>
                      )}
                    </div>

                    <Card.Title>{name}</Card.Title>
                    <Card.Text className="description">{description.substring(0, 100)}...</Card.Text>
                    <h4 className="price">₹{price}</h4>
                    <div className="rating">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} className={`star ${index < rating ? 'filled' : 'empty'}`}>&#9733;</span>
                      ))}
                    </div>

                    {/* Product Hover Effect */}
                    <div className="product-buttons">
                      <Button
                        variant="success"
                        className="add-to-cart-btn"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline-primary"
                        className="add-to-wishlist-btn mt-2"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        Add to Wishlist
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
};

export default ProductList;
