import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import "../products.css"

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.img} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      <p className="product-specs">{product.specs}</p>
      <p className="product-price">£{product.price}</p>
      <div className="product-card-footer">
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        <Link to={`/product/${product.id}`}>More info</Link>
      </div>
    </div>
  );
}
