import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Search, Bell } from 'lucide-react';
import { useLocationStore } from '../store';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocationStore(state => state.location);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 pt-3 pb-3">
      <div className="px-4">
        {/* Location */}
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={18} className="text-gray-600" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">Deliver to</p>
            <p className="text-sm font-semibold text-gray-900 truncate">{location.address}</p>
          </div>
          <button className="text-green-500 text-xs font-bold ml-2">CHANGE</button>
        </div>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-2">
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-2 gap-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search for atta, dal, coke and more…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 outline-none text-sm"
            />
          </div>
          <button
            type="button"
            className="p-2 text-gray-600 hover:text-green-500 transition-colors"
          >
            <Bell size={20} />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
