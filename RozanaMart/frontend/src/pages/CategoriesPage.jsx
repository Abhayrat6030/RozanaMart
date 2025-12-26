import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const categories = [
    { id: 1, name: 'Vegetables & Fruits', icon: '🥬', color: 'bg-green-50' },
    { id: 2, name: 'Atta, Rice & Dal', icon: '🌾', color: 'bg-yellow-50' },
    { id: 3, name: 'Oil, Ghee & Masala', icon: '🫒', color: 'bg-orange-50' },
    { id: 4, name: 'Dairy, Bread & Eggs', icon: '🥛', color: 'bg-blue-50' },
    { id: 5, name: 'Snacks & Drinks', icon: '🥤', color: 'bg-red-50' },
    { id: 6, name: 'Beauty & Personal Care', icon: '💄', color: 'bg-pink-50' },
    { id: 7, name: 'Home & Kitchen', icon: '🏠', color: 'bg-purple-50' },
    { id: 8, name: 'Baby Care', icon: '👶', color: 'bg-indigo-50' },
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
        <h1 className="text-lg font-bold">Categories</h1>
      </div>
      
      {/* Categories Grid */}
      <div className="px-4 py-4 grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => navigate(`/products/${category.id}`)}
            className={`${category.color} rounded-lg p-4 text-center hover:shadow-lg transition-all hover:scale-105`}
          >
            <div className="text-4xl mb-2">{category.icon}</div>
            <p className="font-semibold text-gray-900 text-sm">{category.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
