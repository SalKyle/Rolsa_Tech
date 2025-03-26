import React from 'react';
import { Link } from 'react-router-dom';
// import ThemeToggle from './ThemeToggle';
// import LanguageSelector from './LanguageSelector';
// import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">ROLSA <span>TECHNOLOGIES</span></div>
    <div className="nav-links">
      <Link to="/products">Products</Link>
      <Link to="/calculator">Carbon Calculator</Link>
      <Link to="/booking">Consultations</Link>
      <Link to="/energy">Energy Tracker</Link>
      <Link to="/ev-locator">EV Locator</Link>
    </div>
    <div className="nav-utilities">
      {/* <LanguageSelector /> */}
      {/* <ThemeToggle /> */}
    </div>
  </nav>
);

export default Navbar;