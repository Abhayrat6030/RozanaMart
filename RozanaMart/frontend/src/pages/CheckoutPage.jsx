import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, User } from 'lucide-react';
import { useCartStore, useLocationStore, useAuthStore } from '../store';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const location = useLocationStore(state => state.location);
  const user = useAuthStore(state => state.user);
  const cartTotal = getTotal();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: location.address || '',
    lat: location.lat || 28.6139,
    lng: location.lng || 77.2090,
  });
  
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const deliveryCharge = 50;
  const distance = 3; // km - mock value
  
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
  const codAmount = cartTotal + deliveryCharge - advanceAmount;
  const totalAmount = cartTotal + deliveryCharge;
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePlaceOrder = async () => {
    if (!agreeTerms) {
      alert('Please agree to Terms & Conditions');
      return;
    }
    
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill all fields');
      return;
    }
    
    setLoading(true);
    
    // Mock payment flow
    try {
      // Simulate advance payment
      const order = {
        id: 'RM' + Date.now(),
        items,
        customer: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          lat: formData.lat,
          lng: formData.lng,
        },
        amounts: {
          subtotal: cartTotal,
          advance: advanceAmount,
          cod: codAmount,
          delivery: deliveryCharge,
          total: totalAmount
        },
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      // Save to localStorage (in real app, save to backend)
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Clear cart
      clearCart();
      
      // Redirect to success
      navigate(`/orders/${order.id}`);
    } catch (error) {
      alert('Error placing order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
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
        <h1 className="text-lg font-bold">Checkout</h1>
      </div>
      
      {/* Order Summary */}
      <div className="px-4 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>{items.length} items</span>
            <span>₹{Math.round(cartTotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Delivery charge</span>
            <span>₹{deliveryCharge}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Distance: {distance} km</span>
            <span>Within 10 km ✓</span>
          </div>
        </div>
      </div>
      
      {/* Delivery Address */}
      <div className="px-4 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Delivery Address</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1 font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1 font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone"
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-600 mb-1 font-semibold">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter delivery address"
              rows="3"
              className="input-field"
            />
          </div>
        </div>
      </div>
      
      {/* Payment Summary */}
      <div className="px-4 py-4 bg-blue-50 border-l-4 border-blue-500">
        <h3 className="font-semibold text-gray-900 mb-3">Payment Breakdown</h3>
        <div className="space-y-2 text-sm mb-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Order Total</span>
            <span className="font-bold">₹{Math.round(cartTotal + deliveryCharge)}</span>
          </div>
          <div className="flex justify-between border-t border-blue-200 pt-2 mt-2">
            <span className="text-blue-900 font-semibold">Advance (UPI)</span>
            <span className="text-blue-900 font-bold">₹{advanceAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pay on Delivery (COD)</span>
            <span className="font-bold">₹{codAmount}</span>
          </div>
        </div>
      </div>
      
      {/* Agreement */}
      <div className="px-4 py-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-1 w-4 h-4 accent-green-500"
          />
          <span className="text-sm text-gray-700">
            I agree to{' '}
            <a href="/terms" className="text-green-500 font-semibold">Terms & Conditions</a>, 
            {' '}<a href="/privacy" className="text-green-500 font-semibold">Privacy Policy</a>, and 
            {' '}<a href="/cancellation" className="text-green-500 font-semibold">Cancellation Policy</a>
          </span>
        </label>
      </div>
      
      {/* Place Order Button */}
      <div className="sticky bottom-20 left-0 right-0 px-4 py-3 bg-white border-t border-gray-200">
        <button
          onClick={handlePlaceOrder}
          disabled={loading || !agreeTerms}
          className={`w-full btn-primary py-4 text-lg font-bold rounded-lg transition-all ${
            loading || !agreeTerms ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
          }`}
        >
          {loading ? 'Processing...' : `Pay ₹${advanceAmount} Now (Advance)`}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
