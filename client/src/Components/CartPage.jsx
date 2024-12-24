import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, increaseQuantity, decreaseQuantity } from '../Store/Slices/cart'; // Actions
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // Bootstrap components
import './CartPage.css'; // Custom CSS for Cart Page

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart); // Access cart items from Redux store
  const dispatch = useDispatch();

  // Function to calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0);
  };

  if (!Array.isArray(cartItems)) {
    return <p>Error: Cart data is invalid.</p>; // Handle invalid cart data
  }

  return (
    <Container fluid className="cart-page">
      <h2 className="cart-header">Your Cart</h2>
      <Row className="cart-content">
        <Col md={8} sm={12}>
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => {
              const price = item.price || 0;
              const quantity = item.quantity || 1;
              return (
                <Card key={item._id} className="cart-item">
                  <Row className="cart-item-row">
                    <Col xs={4} sm={3}>
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                    </Col>
                    <Col xs={8} sm={9}>
                      <div className="cart-item-details">
                        <h3 className="product-name">{item.name}</h3>
                        <p className="product-price">₹{price}</p>
                        <div className="quantity-control">
                          <Button
                            variant="outline-secondary"
                            onClick={() => dispatch(decreaseQuantity(item._id))} // Decrease quantity
                          >
                            -
                          </Button>
                          <span>{quantity}</span>
                          <Button
                            variant="outline-secondary"
                            onClick={() => dispatch(increaseQuantity(item._id))} // Increase quantity
                          >
                            +
                          </Button>
                        </div>
                        <p className="total-price">Total: ₹{price * quantity}</p>
                        <Button
                          variant="danger"
                          onClick={() => dispatch(removeProduct(item._id))} // Remove item
                          className="remove-item-btn"
                        >
                          Remove
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              );
            })
          )}
        </Col>

        <Col md={4} sm={12}>
          <Card className="cart-summary">
            <Card.Body>
              <h3 className="cart-total">Total Price: ₹{calculateTotalPrice()}</h3>
              <Button variant="success" className="checkout-btn" block>
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
