import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const RefundPage = () => {
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
        <h1 className="text-lg font-bold">Refund Policy</h1>
      </div>
      
      {/* Content */}
      <div className="px-4 py-6 max-w-3xl mx-auto">
        <div className="prose prose-sm prose-gray max-w-none">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Refund Policy</h2>
          <p className="text-gray-700 mb-4">Last updated: December 2024</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-900">Overview</h3>
              <p className="text-gray-700">At RozanaMart, we want you to be completely satisfied with your purchases. This refund policy outlines the terms and conditions under which we offer refunds for orders placed through our website.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Eligibility for Refunds</h3>
              <p className="text-gray-700">You may be eligible for a refund in the following circumstances:</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Products delivered are damaged or defective</li>
                <li>Products delivered do not match the order placed</li>
                <li>Products are expired or past their best-before date</li>
                <li>Refund request is made within 24 hours of delivery</li>
                <li>Products are unopened and in original packaging</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Non-Refundable Items</h3>
              <p className="text-gray-700">The following items are non-refundable:</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Opened or partially used products</li>
                <li>Products where the user is solely responsible for damage</li>
                <li>Perishable items that have been consumed</li>
                <li>Items purchased from promotional offers (non-returnable)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Refund Process</h3>
              <ol className="list-decimal list-inside text-gray-700 mt-2 space-y-1">
                <li>Contact our customer support team within 24 hours of delivery</li>
                <li>Provide photos and description of the issue</li>
                <li>Our team will verify the claim</li>
                <li>Upon approval, we will arrange product pickup</li>
                <li>Refund will be processed within 5-7 business days</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Refund Amount</h3>
              <p className="text-gray-700">The refund amount will include the product cost only. Delivery charges and advance payments are non-refundable unless the issue is on our end.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Processing Time</h3>
              <p className="text-gray-700">Approved refunds will be credited back to your original payment method within 5-7 business days after we receive the returned item.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Contact Us</h3>
              <p className="text-gray-700">For refund inquiries, please contact: support@rozanamart.com or call 1800-ROZANA-1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPage;
