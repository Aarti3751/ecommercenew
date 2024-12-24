import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './Footer.css'; // Import custom CSS for footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid className="footer-container">
        <Row className="footer-top">
          {/* Company Information */}
          <Col md={3} sm={6} xs={12} className="footer-section">
            <h5>Company</h5>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
            </ul>
          </Col>

          {/* Quick Links */}
          <Col md={3} sm={6} xs={12} className="footer-section">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/wishlist">Wishlist</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </Col>

          {/* Contact Information */}
          <Col md={3} sm={6} xs={12} className="footer-section">
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:support@website.com">support@website.com</a></li>
              <li><a href="tel:+1234567890">+1 234 567 890</a></li>
            </ul>
            <div className="social-media">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </Col>

          {/* Newsletter Subscription */}
          <Col md={3} sm={6} xs={12} className="footer-section">
            <h5>Subscribe to Our Newsletter</h5>
            <Form>
              <Form.Control type="email" placeholder="Enter your email" className="newsletter-input" />
              <Button variant="primary" className="subscribe-btn" type="submit">Subscribe</Button>
            </Form>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <Row className="footer-bottom">
          <Col className="text-center">
            <p>&copy; 2024 Your Website Name. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
