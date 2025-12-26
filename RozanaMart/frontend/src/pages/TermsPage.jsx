import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsPage = () => {
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
        <h1 className="text-lg font-bold">Terms & Conditions</h1>
      </div>
      
      {/* Content */}
      <div className="px-4 py-6 max-w-3xl mx-auto">
        <div className="prose prose-sm prose-gray max-w-none">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Terms & Conditions</h2>
          <p className="text-gray-700 mb-4">Last updated: December 2024</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-900">1. Acceptance of Terms</h3>
              <p className="text-gray-700">By accessing and using RozanaMart, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">2. Use License</h3>
              <p className="text-gray-700">Permission is granted to temporarily download one copy of the materials (information or software) on RozanaMart for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the site</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">3. Disclaimer</h3>
              <p className="text-gray-700">The materials on RozanaMart are provided on an 'as is' basis. RozanaMart makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">4. Limitations</h3>
              <p className="text-gray-700">In no event shall RozanaMart or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on RozanaMart, even if RozanaMart or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">5. Accuracy of Materials</h3>
              <p className="text-gray-700">The materials appearing on RozanaMart could include technical, typographical, or photographic errors. RozanaMart does not warrant that any of the materials on RozanaMart are accurate, complete, or current. RozanaMart may make changes to the materials contained on its website at any time without notice.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">6. Links</h3>
              <p className="text-gray-700">RozanaMart has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by RozanaMart of the site. Use of any such linked website is at the user's own risk.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">7. Modifications</h3>
              <p className="text-gray-700">RozanaMart may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">8. Governing Law</h3>
              <p className="text-gray-700">These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
