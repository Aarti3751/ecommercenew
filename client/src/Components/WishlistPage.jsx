// src/Components/WishlistPage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../Store/Slices/wishlist'; // Remove from wishlist
import { addToCart } from '../Store/Slices/cart'; // Add to cart action
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; 
import './WishlistPage.css'; 

const WishlistPage = () => {
  // Get wishlist items from Redux store
  const wishlist = useSelector((state) => state.wishlist || []); // Default to empty array if wishlist is undefined
  
  // Dispatch function for removing items from wishlist and adding to cart
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Add product to cart
    dispatch(removeFromWishlist(product._id)); // Remove product from wishlist after adding to cart
  };

  return (
    <Container fluid className="wishlist-container">
      <h1 className="text-center my-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-center">Your wishlist is empty. Start adding products!</p>
      ) : (
        <Row>
          {wishlist.map((product) => {
            const { name, _id, price, image } = product;

            return (
              <Col md={3} sm={6} xs={12} key={_id} className="mb-4">
                <Card className="product-card">
                  <Card.Img variant="top" src={image} className="product-image" />
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <h4 className="price">₹{price}</h4>
                    <Button
                      variant="success"
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)} // Handle Add to Cart action
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="danger"
                      className="remove-from-wishlist-btn mt-2"
                      onClick={() => dispatch(removeFromWishlist(_id))} // Dispatch remove action
                    >
                      Remove from Wishlist
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default WishlistPage;
