import React from 'react';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from '../context/CartContext';
import Navbar from './components/Navbar';
import { useTranslation } from 'react-i18next'; // ✅ Add this
import './products.css';

const products = [
  // Solar
  { id: 1, name: 'Solar Panel Pro', category: 'Solar', price: 499, img: 'https://via.placeholder.com/300x180', specs: '400W, Monocrystalline, 25-year warranty' },
  { id: 2, name: 'Solar Inverter Max', category: 'Solar', price: 350, img: 'https://via.placeholder.com/300x180', specs: '3kW inverter, Wi-Fi Monitoring' },

  // EV
  { id: 3, name: 'EV Charger X', category: 'EV', price: 299, img: 'https://via.placeholder.com/300x180', specs: '7kW, Type 2 Connector, App-controlled' },
  { id: 4, name: 'EV FastCharge 22kW', category: 'EV', price: 549, img: 'https://via.placeholder.com/300x180', specs: '22kW, Dual port, Smart scheduling' },

  // Other
  { id: 5, name: 'Smart Energy Hub', category: 'Other', price: 699, img: 'https://via.placeholder.com/300x180', specs: 'Battery backup, energy analytics' },
  { id: 6, name: 'Smart Thermostat', category: 'Other', price: 149, img: 'https://via.placeholder.com/300x180', specs: 'Voice control, auto-scheduling' },
];

export default function ProductsPage() {
  const { t } = useTranslation(); // ✅ Add this

  const renderSection = (titleKey, category) => {
    const filtered = products.filter((p) => p.category === category);
    return (
      <section className="product-section">
        <div className="section-header">
          <h2>{t(`products.section_titles.${category}`, titleKey)}</h2>
          <button className="see-more-btn">{t('products.see_more', 'See more')}</button>
        </div>
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <CartProvider>
      <Navbar />
      <div className="products-page">
        <h1 className="products-title">{t('products.title', 'Our Products')}</h1>
        <div className="products-layout">
          <div className="products-content">
            {renderSection('Solar Products', 'Solar')}
            {renderSection('EV Chargers', 'EV')}
            {renderSection('Other Products', 'Other')}
          </div>
          <CartSidebar />
        </div>
      </div>
    </CartProvider>
  );
}
