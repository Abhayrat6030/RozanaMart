import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { useCartStore } from '../store';
import QuantitySelector from '../components/QuantitySelector';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart, items: cartItems, updateQuantity, removeFromCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  
  // Mock product data
  const product = {
    id: parseInt(id),
    name: 'Onion',
    weight: '1 kg',
    price: 35,
    mrp: 50,
    image: 'https://via.placeholder.com/400?text=Onion',
    rating: 4.5,
    reviews: 1250,
    description: 'Fresh, premium quality onions sourced directly from farms. Perfect for everyday cooking.',
    category: 1
  };
  
  const cartItem = cartItems.find(item => item.id === product.id);
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };
  
  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, cartItem.quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (cartItem.quantity > 1) {
      updateQuantity(product.id, cartItem.quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };
  
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">{product.name}</h1>
      </div>
      
      {/* Product Image */}
      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product Info */}
      <div className="px-4 py-4">
        {/* Price Section */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
            <span className="text-lg text-gray-500 line-through">₹{product.mrp}</span>
            <span className="text-sm font-bold text-red-500">{Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF</span>
          </div>
          <p className="text-sm text-gray-600">{product.weight}</p>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded">
            <Star size={14} className="fill-current" />
            <span className="text-sm font-bold">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-600">{product.reviews} reviews</span>
        </div>
        
        {/* Description */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
        </div>
        
        {/* Similar Products */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">Similar Products</h3>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-2">
                <div className="w-full aspect-square bg-gray-200 rounded-lg mb-2"></div>
                <p className="text-xs font-semibold text-gray-900">Potato</p>
                <p className="text-xs text-gray-600">₹25</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add to Cart Button */}
      <div className="sticky bottom-20 left-0 right-0 px-4 py-3 bg-white border-t border-gray-200">
        {cartItem ? (
          <QuantitySelector
            quantity={cartItem.quantity}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
          />
        ) : (
          <>
            <div className="flex items-center gap-2 mb-3">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-center"
              />
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary text-lg font-bold"
              >
                ADD TO CART
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
