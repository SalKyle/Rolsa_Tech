
import axios from 'axios';
import { useCart } from '../ProductsPage'; 
import './CheckoutButton.css';

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
      alert('Transaction saved!');
      clearCart();
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to save transaction.');
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="checkout-btn"
    >
      Checkout
    </button>
  );
}
