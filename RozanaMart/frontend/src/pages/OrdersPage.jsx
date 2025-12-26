import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);
  
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white px-4">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-600 text-center mb-6">Place your first order to see it here</p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Start Shopping
        </button>
      </div>
    );
  }
  
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
        <h1 className="text-lg font-bold">My Orders</h1>
      </div>
      
      {/* Orders List */}
      <div className="px-4 py-4 space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => navigate(`/orders/${order.id}`)}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-bold text-gray-900">{order.id}</p>
                <p className="text-xs text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()} • {new Date(order.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                order.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {order.status === 'delivered' ? '✓ Delivered' :
                 order.status === 'out_for_delivery' ? '🚚 Out for Delivery' :
                 '⏳ Processing'}
              </span>
            </div>
            
            <div className="border-t border-gray-200 py-2 my-2">
              <p className="text-xs text-gray-600">{order.items.length} items • ₹{Math.round(order.amounts.total)}</p>
            </div>
            
            <p className="text-xs text-gray-600">{order.customer.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
