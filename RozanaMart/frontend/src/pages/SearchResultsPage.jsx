import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { useCartStore } from '../store';
import ProductCard from '../components/ProductCard';
import QuantitySelector from '../components/QuantitySelector';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart, items: cartItems, updateQuantity, removeFromCart } = useCartStore();
  
  // Mock search results
  const allProducts = [
    { id: 1, name: 'Onion', weight: '1 kg', price: 35, mrp: 50, image: 'https://via.placeholder.com/200?text=Onion', rating: 4.5, category: 1, discount: 30 },
    { id: 2, name: 'Tomato', weight: '500g', price: 28, mrp: 40, image: 'https://via.placeholder.com/200?text=Tomato', rating: 4.3, category: 1, discount: 30 },
    { id: 3, name: 'Aata', weight: '5 kg', price: 180, mrp: 220, image: 'https://via.placeholder.com/200?text=Aata', rating: 4.7, category: 2, discount: 18 },
    { id: 4, name: 'Basmati Rice', weight: '1 kg', price: 120, mrp: 150, image: 'https://via.placeholder.com/200?text=Rice', rating: 4.6, category: 2 },
    { id: 5, name: 'Sunflower Oil', weight: '1 L', price: 145, mrp: 180, image: 'https://via.placeholder.com/200?text=Oil', rating: 4.4, category: 3, discount: 19 },
    { id: 6, name: 'Paneer', weight: '200g', price: 95, mrp: 120, image: 'https://via.placeholder.com/200?text=Paneer', rating: 4.5, category: 4 },
  ];
  
  const results = allProducts.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
  
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
        <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-2 gap-2">
          <Search size={18} className="text-gray-500" />
          <span className="text-sm font-semibold text-gray-900">{query}</span>
        </div>
      </div>
      
      {/* Results */}
      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen px-4">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No products found</h2>
          <p className="text-gray-600 text-center">Try searching with different keywords</p>
        </div>
      ) : (
        <div className="px-4 py-4">
          <p className="text-sm text-gray-600 mb-4">Found {results.length} products</p>
          <div className="grid grid-cols-2 gap-2">
            {results.map((product) => {
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
      )}
    </div>
  );
};

export default SearchResultsPage;
