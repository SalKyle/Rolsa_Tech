import React from 'react';
import { useCart } from '../../context/CartContext';
import axios from 'axios';

export default function CartSidebar() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const handleCheckout = async () => {
    try {
      await axios.post("http://localhost:5000/api/transactions", {
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.price, 0),
        timestamp: new Date().toISOString()
      });
      alert("✅ Transaction saved!");
      clearCart();
    } catch (error) {
      console.error("❌ Checkout failed:", error);
      alert("Checkout failed. Try again.");
    }
  };

  return (
    <div className="bg-gray-50 p-4 border-l w-full md:w-1/3">
      <h2 className="text-xl font-bold mb-4">🛒 Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{item.name}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
