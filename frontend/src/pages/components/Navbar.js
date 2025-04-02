import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { User } from 'lucide-react'; // 👤 Outlined User icon
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">
      <Link to="/">ROLSA <br /><span>TECHNOLOGIES</span></Link>
    </div>

    <div className="nav-links">
      <Link to="/Products">Products</Link>
      <Link to="/cf_page">Carbon Calculator</Link>
      <Link to="/BookingPage">Consultations</Link>
      <Link to="/EnergyTracker">Energy Tracker</Link>
      <Link to="/EVLocator">EV Locator</Link>
    </div>

    <div className="nav-utilities">
      <ThemeToggle />
      <Link to="/AccountSettings" className="icon-button" title="Account Settings">
        <User size={22} strokeWidth={2} />
      </Link>

      
    </div>
  </nav>
);

export default Navbar;
