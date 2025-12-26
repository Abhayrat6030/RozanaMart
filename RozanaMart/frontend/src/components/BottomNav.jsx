import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingCart, Package, User } from 'lucide-react';
import { useCartStore } from '../store';

const BottomNav = () => {
  const location = useLocation();
  const cartItems = useCartStore(state => state.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Grid, label: 'Categories', path: '/categories' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart', badge: cartCount },
    { icon: Package, label: 'Orders', path: '/orders' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];
  
  return (
    <nav className="sticky-bottom-nav bg-white border-t border-gray-200 shadow-2xl">
      <div className="flex justify-around items-center h-20">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors duration-200 ${
                active ? 'text-green-500' : 'text-gray-600 hover:text-green-500'
              }`}
            >
              <div className="relative">
                <Icon size={24} />
                {item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
