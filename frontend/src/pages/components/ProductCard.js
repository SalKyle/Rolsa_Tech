import React from 'react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white">
      <img src={product.img} alt={product.name} className="rounded mb-3" />
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600 mb-2">£{product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
