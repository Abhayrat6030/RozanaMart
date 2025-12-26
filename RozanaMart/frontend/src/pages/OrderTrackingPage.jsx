import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Truck } from 'lucide-react';

const OrderTrackingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const foundOrder = savedOrders.find(o => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [id]);
  
  const handleSubmitReview = () => {
    if (rating > 0) {
      alert('Thank you for your review!');
      setSubmitted(true);
      setRating(0);
      setReview('');
    }
  };
  
  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading order details...</p>
      </div>
    );
  }
  
  const statuses = [
    { key: 'pending', label: 'Order Placed', completed: true },
    { key: 'confirmed', label: 'Confirmed', completed: ['pending', 'confirmed'].includes(order.status) },
    { key: 'packed', label: 'Packed', completed: ['pending', 'confirmed', 'packed'].includes(order.status) },
    { key: 'out_for_delivery', label: 'Out for Delivery', completed: ['pending', 'confirmed', 'packed', 'out_for_delivery'].includes(order.status) },
    { key: 'delivered', label: 'Delivered', completed: order.status === 'delivered' },
  ];
  
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
        <div>
          <h1 className="text-lg font-bold">Order {order.id}</h1>
          <p className="text-xs text-gray-600">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      {/* Tracking Timeline */}
      <div className="px-4 py-6">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Order Status</h3>
        <div className="space-y-4">
          {statuses.map((status, index) => (
            <div key={status.key} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                  status.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {status.completed ? '✓' : index + 1}
                </div>
                {index < statuses.length - 1 && (
                  <div className={`w-0.5 h-12 ${status.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                )}
              </div>
              <div className="pt-1">
                <p className={`font-semibold ${status.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                  {status.label}
                </p>
                {status.completed && status.key === order.status && (
                  <p className="text-xs text-green-600 mt-1">Current Status</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Order Details */}
      <div className="px-4 py-4 bg-gray-50 border-y border-gray-200">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Delivery Details</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">{order.customer.name}</p>
              <p className="text-gray-600">{order.customer.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-green-500" />
            <p className="text-gray-900">{order.customer.phone}</p>
          </div>
        </div>
      </div>
      
      {/* Items */}
      <div className="px-4 py-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Items</h3>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-900">{item.name} x{item.quantity}</span>
              <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Breakdown */}
      <div className="px-4 py-4 bg-gray-50 border-y border-gray-200">
        <div className="space-y-2 text-sm mb-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{Math.round(order.amounts.subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Delivery</span>
            <span>₹{order.amounts.delivery}</span>
          </div>
          <div className="flex justify-between text-gray-600 border-t border-gray-300 pt-2 mt-2">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-gray-900">₹{Math.round(order.amounts.total)}</span>
          </div>
        </div>
        <div className="bg-blue-50 p-2 rounded text-xs text-blue-900">
          <p className="font-semibold mb-1">Payment Status</p>
          <p>Advance: ₹{order.amounts.advance} (Paid)</p>
          <p>COD: ₹{order.amounts.cod} (Due on delivery)</p>
        </div>
      </div>
      
      {/* Rating Section */}
      {order.status === 'delivered' && !submitted && (
        <div className="px-4 py-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Rate this order</h3>
          <div className="space-y-3">
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="text-2xl transition-transform hover:scale-110"
                >
                  {star <= rating ? '⭐' : '☆'}
                </button>
              ))}
            </div>
            <textarea
              placeholder="Share your review (optional)"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="3"
            />
            <button
              onClick={handleSubmitReview}
              disabled={rating === 0}
              className="w-full btn-primary py-2 disabled:opacity-50"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
      
      {submitted && (
        <div className="px-4 py-4 bg-green-50 border border-green-200 rounded-lg m-4">
          <p className="text-green-700 font-semibold text-center">Thank you for your review!</p>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;
