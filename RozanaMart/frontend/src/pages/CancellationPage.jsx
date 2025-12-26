import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CancellationPage = () => {
  const navigate = useNavigate();
  
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
        <h1 className="text-lg font-bold">Cancellation Policy</h1>
      </div>
      
      {/* Content */}
      <div className="px-4 py-6 max-w-3xl mx-auto">
        <div className="prose prose-sm prose-gray max-w-none">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Cancellation Policy</h2>
          <p className="text-gray-700 mb-4">Last updated: December 2024</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-900">Order Cancellation</h3>
              <p className="text-gray-700">Orders can be cancelled under the following conditions:</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Cancellation requested before order confirmation (within 5 minutes)</li>
                <li>Cancellation requested before the order is out for delivery</li>
                <li>Cancellation due to product unavailability</li>
                <li>Cancellation due to delivery address issues</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Cancellation Window</h3>
              <p className="text-gray-700"><strong>Before Confirmation:</strong> You can cancel your order within 5 minutes of placing it without any charges.</p>
              <p className="text-gray-700 mt-2"><strong>After Confirmation:</strong> Orders confirmed and out for delivery cannot be cancelled. You may refuse delivery and initiate a return.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Refund for Cancelled Orders</h3>
              <p className="text-gray-700">If you cancel an order within the allowed window:</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Full refund of advance payment will be credited</li>
                <li>Refund processed within 2-3 business days</li>
                <li>No cancellation charges applied</li>
                <li>Delivery charges will be refunded if order hasn't been dispatched</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Non-Cancellable Orders</h3>
              <p className="text-gray-700">Orders cannot be cancelled in the following situations:</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Order is already out for delivery</li>
                <li>Order has been delivered</li>
                <li>Cancellation request made after 5 minutes of order placement</li>
                <li>Cancellation during peak hours (unable to process)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">How to Cancel</h3>
              <ol className="list-decimal list-inside text-gray-700 mt-2 space-y-1">
                <li>Go to "My Orders" section</li>
                <li>Select the order you want to cancel</li>
                <li>Click "Cancel Order" button</li>
                <li>Confirm the cancellation</li>
                <li>Refund will be processed automatically</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Refused Delivery</h3>
              <p className="text-gray-700">If you refuse delivery after the order is out for delivery:</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Advance payment will be refunded</li>
                <li>Delivery charge will NOT be refunded</li>
                <li>Refund processed within 5-7 business days</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Multiple Cancellations</h3>
              <p className="text-gray-700">If you cancel more than 3 orders within a month, your account may be flagged. Repeated cancellations may result in temporary account suspension.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Contact Support</h3>
              <p className="text-gray-700">For cancellation issues, contact: support@rozanamart.com or call 1800-ROZANA-1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPage;
