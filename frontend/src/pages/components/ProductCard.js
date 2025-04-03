import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 
import "../products.css"

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  return (
    <div className="product-card">
      <img src={product.img} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      <p className="product-specs">{product.specs}</p>
      <p className="product-price">£{product.price}</p>
      <div className="product-card-footer">
        <button onClick={() => addToCart(product)}>
          {t('product_card.add_to_cart', 'Add to Cart')}
        </button>
        <Link to={`/product/${product.id}`}>
          {t('product_card.more_info', 'More info')}
        </Link>
      </div>
    </div>
  );
}
