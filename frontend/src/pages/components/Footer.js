import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>ROLSA <span>TECHNOLOGIES</span></h3>
          <p>Empowering clean, connected living.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/bookings">Book a Service</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Account</h4>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/account">Settings</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Rolsa Technologies. All rights reserved.</p>
      </div>
    </footer>
  );
}
