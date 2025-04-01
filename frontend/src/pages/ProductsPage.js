import React from 'react';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from '../context/CartContext';

// 🧪 Dummy Product Data
const products = [
  { id: 1, name: 'Solar Panel Pro', price: 499, img: 'https://via.placeholder.com/300x180' },
  { id: 2, name: 'EV Charger X', price: 299, img: 'https://via.placeholder.com/300x180' },
  { id: 3, name: 'Smart Energy Hub', price: 699, img: 'https://via.placeholder.com/300x180' },
];

export default function ProductsPage() {
  return (
    <CartProvider>
      <div className="max-w-6xl mx-auto p-6 font-[Poppins]">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Our Products</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <CartSidebar />
        </div>
      </div>
    </CartProvider>
  );
}
