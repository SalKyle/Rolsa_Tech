import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { User } from 'lucide-react'; 
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './Navbar.css';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          ROLSA <br /><span>{t('navbar.brand_subtext', 'TECHNOLOGIES')}</span>
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/Products">{t('navbar.products', 'Products')}</Link>
        <Link to="/cf_page">{t('navbar.carbon_calculator', 'Carbon Calculator')}</Link>
        <Link to="/BookingPage">{t('navbar.consultations', 'Consultations')}</Link>
        <Link to="/EnergyTracker">{t('navbar.energy_tracker', 'Energy Tracker')}</Link>
        <Link to="/EVLocator">{t('navbar.ev_locator', 'EV Locator')}</Link>
      </div>

      <div className="nav-utilities">
        <LanguageSwitcher />
        <ThemeToggle />
        <Link to="/AccountSettings" className="icon-button" title={t('navbar.account', 'Account')}>
          <User size={22} strokeWidth={2} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
