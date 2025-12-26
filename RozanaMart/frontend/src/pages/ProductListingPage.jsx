import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store';
import ProductCard from '../components/ProductCard';
import QuantitySelector from '../components/QuantitySelector';

const ProductListingPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { addToCart, items: cartItems, updateQuantity, removeFromCart } = useCartStore();
  
  // Mock category name
  const categoryNames = {
    '1': 'Vegetables & Fruits',
    '2': 'Atta, Rice & Dal',
    '3': 'Oil, Ghee & Masala',
    '4': 'Dairy, Bread & Eggs',
    '5': 'Snacks & Drinks',
    '0': 'All Products',
  };
  
  // Mock products
  const products = [
    { id: 1, name: 'Onion', weight: '1 kg', price: 35, mrp: 50, image: 'https://via.placeholder.com/200?text=Onion', rating: 4.5, category: 1, discount: 30 },
    { id: 2, name: 'Tomato', weight: '500g', price: 28, mrp: 40, image: 'https://via.placeholder.com/200?text=Tomato', rating: 4.3, category: 1, discount: 30 },
    { id: 3, name: 'Potato', weight: '1 kg', price: 25, mrp: 35, image: 'https://via.placeholder.com/200?text=Potato', rating: 4.4, category: 1 },
    { id: 4, name: 'Aata', weight: '5 kg', price: 180, mrp: 220, image: 'https://via.placeholder.com/200?text=Aata', rating: 4.7, category: 2, discount: 18 },
    { id: 5, name: 'Basmati Rice', weight: '1 kg', price: 120, mrp: 150, image: 'https://via.placeholder.com/200?text=Rice', rating: 4.6, category: 2 },
    { id: 6, name: 'Dal', weight: '1 kg', price: 95, mrp: 130, image: 'https://via.placeholder.com/200?text=Dal', rating: 4.5, category: 2, discount: 27 },
    { id: 7, name: 'Sunflower Oil', weight: '1 L', price: 145, mrp: 180, image: 'https://via.placeholder.com/200?text=Oil', rating: 4.4, category: 3, discount: 19 },
    { id: 8, name: 'Mustard Oil', weight: '1 L', price: 165, mrp: 210, image: 'https://via.placeholder.com/200?text=Mustard', rating: 4.3, category: 3, discount: 21 },
  ];
  
  const filteredProducts = categoryId === '0'
    ? products
    : products.filter(p => p.category === parseInt(categoryId));
  
  const handleAddToCart = (product) => {
    addToCart(product);
  };
  
  const handleIncreaseQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };
  
  const handleDecreaseQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    } else if (item) {
      removeFromCart(productId);
    }
  };
  
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">{categoryNames[categoryId] || 'Products'}</h1>
      </div>
      
      {/* Products Grid */}
      <div className="px-4 py-4 grid grid-cols-2 gap-2">
        {filteredProducts.map((product) => {
          const cartItem = cartItems.find(item => item.id === product.id);
          return (
            <div key={product.id}>
              {cartItem ? (
                <div className="bg-white rounded-lg p-2 product-card-shadow">
                  <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.discount && (
                      <div className="badge-discount">{product.discount}% OFF</div>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.weight}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                  </div>
                  <QuantitySelector
                    quantity={cartItem.quantity}
                    onIncrease={() => handleIncreaseQuantity(product.id)}
                    onDecrease={() => handleDecreaseQuantity(product.id)}
                    compact
                  />
                </div>
              ) : (
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductListingPage;
