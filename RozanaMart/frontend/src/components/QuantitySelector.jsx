import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';

const QuantitySelector = ({ quantity, onIncrease, onDecrease, onRemove, compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 border border-green-500 rounded-lg">
        <button
          onClick={onDecrease}
          className="text-green-500 hover:bg-green-50 p-1 transition-colors"
        >
          <Minus size={16} />
        </button>
        <span className="w-6 text-center font-semibold text-sm">{quantity}</span>
        <button
          onClick={onIncrease}
          className="text-green-500 hover:bg-green-50 p-1 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-3 bg-green-50 border border-green-500 rounded-full px-4 py-2">
      <button
        onClick={onDecrease}
        className="text-green-500 hover:bg-white p-1 rounded-full transition-colors"
      >
        <Minus size={18} />
      </button>
      <span className="font-bold text-gray-900 min-w-8 text-center">{quantity}</span>
      <button
        onClick={onIncrease}
        className="text-green-500 hover:bg-white p-1 rounded-full transition-colors"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default QuantitySelector;
