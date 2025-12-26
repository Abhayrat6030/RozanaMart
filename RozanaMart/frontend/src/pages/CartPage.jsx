import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store';
import QuantitySelector from '../components/QuantitySelector';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getTotal } = useCartStore();
  const cartTotal = getTotal();
  
  const deliveryCharge = 50;
  const minOrderValue = 300;
  const canCheckout = cartTotal >= minOrderValue;
  
  const getAdvanceAmount = (total) => {
    if (total >= 300 && total < 400) return 30;
    if (total >= 400 && total < 600) return 50;
    if (total >= 600 && total < 800) return 70;
    if (total >= 800 && total < 1000) return 100;
    if (total >= 1000 && total < 1500) return 150;
    if (total >= 1500 && total < 2000) return 200;
    if (total >= 2000) return 300;
    return 0;
  };
  
  const advanceAmount = getAdvanceAmount(cartTotal);
  const totalWithDelivery = cartTotal + deliveryCharge;
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 text-center mb-6">Add some products to get started!</p>
        <Link
          to="/"
          className="btn-primary"
        >
          Start Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">My Cart</h1>
      </div>
      
      {/* Cart Items */}
      <div className="px-4 py-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 mb-4 pb-4 border-b border-gray-200 last:border-b-0">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-xs text-gray-600 mb-1">{item.weight}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">₹{item.price}</span>
                <QuantitySelector
                  quantity={item.quantity}
                  onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                  onDecrease={() => {
                    if (item.quantity > 1) {
                      updateQuantity(item.id, item.quantity - 1);
                    } else {
                      removeFromCart(item.id);
                    }
                  }}
                  compact
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Price Breakup */}
      <div className="px-4 py-4 bg-gray-50 mx-4 rounded-lg mb-4">
        <h3 className="font-semibold text-gray-900 mb-3">Price Details</h3>
        <div className="space-y-2 text-sm mb-3 border-b border-gray-200 pb-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{Math.round(cartTotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Delivery Charge</span>
            <span>₹{deliveryCharge}</span>
          </div>
        </div>
        <div className="flex justify-between font-bold text-gray-900 mb-3">
          <span>Total Amount</span>
          <span>₹{Math.round(totalWithDelivery)}</span>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded p-2 text-xs text-blue-900">
          <p className="font-semibold mb-1">Advance Pay: ₹{advanceAmount}</p>
          <p>Pay remaining on delivery (COD)</p>
        </div>
      </div>
      
      {/* Checkout Button */}
      <div className="sticky bottom-20 left-0 right-0 px-4 py-3 bg-white border-t border-gray-200">
        <button
          onClick={() => canCheckout && navigate('/checkout')}
          disabled={!canCheckout}
          className={`w-full btn-primary py-4 text-lg font-bold rounded-lg transition-all ${
            !canCheckout ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
          }`}
        >
          {canCheckout
            ? `Proceed to Checkout (₹${Math.round(advanceAmount)} advance)`
            : `Minimum order ₹${minOrderValue} (Current: ₹${Math.round(cartTotal)})`
          }
        </button>
      </div>
    </div>
  );
};

export default CartPage;
