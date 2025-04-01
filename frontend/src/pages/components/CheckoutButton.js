// File: components/CheckoutButton.js
import axios from 'axios';
import { useCart } from '../pages/ProductsPageWithCart'; // Adjust if you move it

export default function CheckoutButton() {
  const { cartItems, clearCart } = useCart();

  const handleCheckout = async () => {
    const payload = {
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price, 0),
      date: new Date().toISOString(),
    };

    try {
      await axios.post('http://localhost:5000/api/transactions', payload);
      alert('✅ Transaction saved!');
      clearCart(); // Clear after successful submission
    } catch (err) {
      console.error('Checkout error:', err);
      alert('❌ Failed to save transaction.');
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    >
      Checkout
    </button>
  );
}
