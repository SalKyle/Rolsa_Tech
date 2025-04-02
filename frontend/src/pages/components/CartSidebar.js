import React from 'react';
import { useCart } from '../../context/CartContext';
import axios from 'axios';
import './CartSidebar.css';

export default function CartSidebar() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const handleCheckout = async () => {
    try {
      await axios.post("http://localhost:5000/api/transactions", {
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.price, 0),
        timestamp: new Date().toISOString()
      });
      alert("Transaction saved!");
      clearCart();
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Try again.");
    }
  };

  return (
    <div className="cart-sidebar">
      <h2 className="cart-title">🛒 Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <span>{item.name}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="cart-remove-btn"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            className="cart-checkout-btn"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
