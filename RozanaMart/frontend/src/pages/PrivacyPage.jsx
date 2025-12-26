import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPage = () => {
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
        <h1 className="text-lg font-bold">Privacy Policy</h1>
      </div>
      
      {/* Content */}
      <div className="px-4 py-6 max-w-3xl mx-auto">
        <div className="prose prose-sm prose-gray max-w-none">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Privacy Policy</h2>
          <p className="text-gray-700 mb-4">Last updated: December 2024</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-900">Introduction</h3>
              <p className="text-gray-700">RozanaMart ("we", "us", "our") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website and the choices you have associated with that data.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Information Collection and Use</h3>
              <p className="text-gray-700">We collect several different types of information for various purposes to provide and improve our service to you:</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li><strong>Personal Data:</strong> While using our website, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include: Email address, Name, Phone number, Address, Cookies and Usage Data</li>
                <li><strong>Usage Data:</strong> We may also collect information on how the website is accessed and used ("Usage Data"). This may include: IP address, Browser type and version, Pages you visit, Time and date of your visit, Device identifier</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Use of Data</h3>
              <p className="text-gray-700">RozanaMart uses the collected data for various purposes:</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>To provide and maintain our website</li>
                <li>To notify you about changes to our website</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our website</li>
                <li>To monitor the usage of our website</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Security of Data</h3>
              <p className="text-gray-700">The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Changes to This Privacy Policy</h3>
              <p className="text-gray-700">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Contact Us</h3>
              <p className="text-gray-700">If you have any questions about this Privacy Policy, please contact us at: support@rozanamart.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
