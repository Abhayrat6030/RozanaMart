import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useCartStore } from '../store';
import ProductCard from '../components/ProductCard';
import QuantitySelector from '../components/QuantitySelector';

const HomePage = () => {
  const navigate = useNavigate();
  const { addToCart, items: cartItems, updateQuantity, removeFromCart } = useCartStore();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Mock data - replace with API call
    const mockCategories = [
      { id: 1, name: 'Vegetables & Fruits', icon: '🥬' },
      { id: 2, name: 'Atta, Rice & Dal', icon: '🌾' },
      { id: 3, name: 'Oil, Ghee & Masala', icon: '🫒' },
      { id: 4, name: 'Dairy & Eggs', icon: '🥛' },
      { id: 5, name: 'Snacks & Drinks', icon: '🥤' },
    ];
    
    const mockProducts = [
      { id: 1, name: 'Onion', weight: '1 kg', price: 35, mrp: 50, image: 'https://via.placeholder.com/200?text=Onion', rating: 4.5, category: 1, discount: 30 },
      { id: 2, name: 'Tomato', weight: '500g', price: 28, mrp: 40, image: 'https://via.placeholder.com/200?text=Tomato', rating: 4.3, category: 1, discount: 30 },
      { id: 3, name: 'Aata', weight: '5 kg', price: 180, mrp: 220, image: 'https://via.placeholder.com/200?text=Aata', rating: 4.7, category: 2, discount: 18 },
      { id: 4, name: 'Basmati Rice', weight: '1 kg', price: 120, mrp: 150, image: 'https://via.placeholder.com/200?text=Rice', rating: 4.6, category: 2 },
      { id: 5, name: 'Sunflower Oil', weight: '1 L', price: 145, mrp: 180, image: 'https://via.placeholder.com/200?text=Oil', rating: 4.4, category: 3, discount: 19 },
      { id: 6, name: 'Paneer', weight: '200g', price: 95, mrp: 120, image: 'https://via.placeholder.com/200?text=Paneer', rating: 4.5, category: 4 },
      { id: 7, name: 'Milk', weight: '1 L', price: 65, mrp: 85, image: 'https://via.placeholder.com/200?text=Milk', rating: 4.8, category: 4 },
      { id: 8, name: 'Coca Cola', weight: '250ml', price: 30, mrp: 50, image: 'https://via.placeholder.com/200?text=CocaCola', rating: 4.2, category: 5, discount: 40 },
    ];
    
    setCategories(mockCategories);
    setProducts(mockProducts);
    setLoading(false);
  }, []);
  
  const handleAddToCart = (product) => {
    addToCart(product);
  };
  
  const handleIncreaseQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };
  
  const handleDecreaseQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    } else if (item) {
      removeFromCart(productId);
    }
  };
  
  const cartTotal = useCartStore(state => state.getTotal());
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="bg-white">
      {/* Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 mx-4 my-3 rounded-lg">
        <h2 className="text-lg font-bold mb-1">Order now and enjoy great offers</h2>
        <p className="text-sm opacity-90">Get up to 50% off on selected items</p>
      </div>
      
      {/* Categories */}
      <div className="px-4 py-3">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Categories</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products/${category.id}`}
              className="flex flex-col items-center gap-2 min-w-fit"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl hover:bg-gray-200 transition-colors">
                {category.icon}
              </div>
              <p className="text-xs text-gray-900 text-center font-medium max-w-16 line-clamp-2">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Bestsellers */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900">Bestsellers</h3>
          <Link to="/products/0" className="text-green-500 text-xs font-bold flex items-center gap-1">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {products.slice(0, 4).map((product) => {
            const cartItem = cartItems.find(item => item.id === product.id);
            return (
              <div key={product.id}>
                {cartItem ? (
                  <div className="bg-white rounded-lg p-2 product-card-shadow">
                    <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.discount && (
                        <div className="badge-discount">{product.discount}% OFF</div>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{product.weight}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                    </div>
                    <QuantitySelector
                      quantity={cartItem.quantity}
                      onIncrease={() => handleIncreaseQuantity(product.id)}
                      onDecrease={() => handleDecreaseQuantity(product.id)}
                      compact
                    />
                  </div>
                ) : (
                  <ProductCard product={product} onAddToCart={handleAddToCart} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Grocery & Kitchen */}
      <div className="px-4 py-3">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Grocery & Kitchen</h3>
        <div className="grid grid-cols-2 gap-2">
          {products.slice(0, 6).map((product) => {
            const cartItem = cartItems.find(item => item.id === product.id);
            return (
              <div key={product.id}>
                {cartItem ? (
                  <div className="bg-white rounded-lg p-2 product-card-shadow">
                    <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{product.weight}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                    </div>
                    <QuantitySelector
                      quantity={cartItem.quantity}
                      onIncrease={() => handleIncreaseQuantity(product.id)}
                      onDecrease={() => handleDecreaseQuantity(product.id)}
                      compact
                    />
                  </div>
                ) : (
                  <ProductCard product={product} onAddToCart={handleAddToCart} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Sticky Cart Bar */}
      {cartTotal > 0 && (
        <div className="sticky-cart-bar bg-green-500 text-white px-4 py-3 shadow-lg">
          <Link
            to="/cart"
            className="flex items-center justify-between hover:bg-green-600 p-2 rounded transition-colors"
          >
            <div>
              <p className="text-xs opacity-90">View Cart</p>
              <p className="text-lg font-bold">{cartItems.length} items</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-90">Total</p>
              <p className="text-xl font-bold">₹{Math.round(cartTotal)}</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
