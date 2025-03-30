import React from 'react';
import { Link } from 'react-router-dom';
// import ThemeToggle from './ThemeToggle';
// import LanguageSelector from './LanguageSelector';
// import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div><Link to="/" className="logo">ROLSA <span>TECHNOLOGIES</span></Link></div>
    <div className="nav-links">
      <Link to="./DietPage">Products</Link>
      <Link to="../cf_page">Carbon Calculator</Link>
      <Link to="/booking">Consultations</Link>
      <Link to="/energy">Energy Tracker</Link>
      <Link to="../EVLocator">EV Locator</Link>
    </div>
    <div className="nav-utilities">
      {/* <LanguageSelector /> */}
      {/* <ThemeToggle /> */}
    </div>
  </nav>
);

export default Navbar;