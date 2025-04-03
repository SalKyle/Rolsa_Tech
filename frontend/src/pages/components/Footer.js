import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>ROLSA <span>{t('footer.brand_suffix', 'TECHNOLOGIES')}</span></h3>
          <p>{t('footer.tagline', 'Empowering clean, connected living.')}</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>{t('footer.quick_links', 'Quick Links')}</h4>
            <ul>
              <li><Link to="/">{t('footer.home', 'Home')}</Link></li>
              <li><Link to="/products">{t('footer.products', 'Products')}</Link></li>
              <li><Link to="/bookings">{t('footer.book', 'Book a Service')}</Link></li>
              <li><Link to="/contact">{t('footer.contact', 'Contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4>{t('footer.account', 'Account')}</h4>
            <ul>
              <li><Link to="/login">{t('footer.login', 'Login')}</Link></li>
              <li><Link to="/signup">{t('footer.signup', 'Sign Up')}</Link></li>
              <li><Link to="/account">{t('footer.settings', 'Settings')}</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {t('footer.copy_right', 'Rolsa Technologies. All rights reserved.')}</p>
      </div>
    </footer>
  );
}
  