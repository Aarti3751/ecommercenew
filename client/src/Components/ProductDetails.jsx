import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To access URL parameters
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // React Bootstrap components
import { useDispatch } from 'react-redux'; // For adding to the cart
import { addToCart } from '../Store/Slices/cart'; // Redux action
import './ProductDetails.css'; // Assuming you have a separate CSS file for styling

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams(); // Get productId from URL
  const dispatch = useDispatch();

  // Fetch product details by ID
  const getProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4003/api/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  // Fetch product details on component mount
  useEffect(() => {
    getProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, price, description, image, rating } = product;

  return (
    <Container fluid className="product-details-container">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={image} className="product-image" />
          </Card>
        </Col>
        <Col md={6}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <h4 className="price">₹{price}</h4>
            <div className="rating">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className={`star ${index < rating ? 'filled' : 'empty'}`}>
                  &#9733;
                </span>
              ))}
            </div>
            <Button 
              variant="success" 
              className="add-to-cart-btn" 
              onClick={() => dispatch(addToCart(product))} // Dispatch action when clicked
            >
              Add to Cart
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
