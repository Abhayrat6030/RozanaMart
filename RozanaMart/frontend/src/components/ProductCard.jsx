import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  
  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    navigate(`/product/${product.id}`);
  };
  
  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg p-2 product-card-shadow cursor-pointer hover:shadow-lg transition-all"
    >
      <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
        <img
          src={product.image || 'https://via.placeholder.com/200'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.discount && (
          <div className="badge-discount">{product.discount}% OFF</div>
        )}
      </div>
      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
      <p className="text-xs text-gray-500 mb-1">{product.weight}</p>
      
      <div className="flex items-center gap-1 mb-2">
        <div className="flex items-center gap-0.5">
          <Star size={12} className="fill-green-500 text-green-500" />
          <span className="text-xs font-semibold text-gray-900">{product.rating || '4.5'}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
          {product.mrp && (
            <span className="text-xs text-gray-500 line-through">₹{product.mrp}</span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded text-xs transition-colors"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
