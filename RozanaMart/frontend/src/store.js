import { create } from 'zustand';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  
  login: (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token, isLoggedIn: true, error: null });
  },
  
  signup: (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token, isLoggedIn: true, error: null });
  },
  
  logout: async () => {
    try {
      await signOut(auth).catch(() => {});
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isLoggedIn: false });
  },
  
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('cart')) || [],
  
  addToCart: (product) => {
    const items = get().items;
    const existingItem = items.find(item => item.id === product.id);
    
    let newItems;
    if (existingItem) {
      newItems = items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newItems = [...items, { ...product, quantity: 1 }];
    }
    
    localStorage.setItem('cart', JSON.stringify(newItems));
    set({ items: newItems });
  },
  
  removeFromCart: (productId) => {
    const newItems = get().items.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(newItems));
    set({ items: newItems });
  },
  
  updateQuantity: (productId, quantity) => {
    const newItems = get().items.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(0, quantity) }
        : item
    ).filter(item => item.quantity > 0);
    
    localStorage.setItem('cart', JSON.stringify(newItems));
    set({ items: newItems });
  },
  
  clearCart: () => {
    localStorage.removeItem('cart');
    set({ items: [] });
  },
  
  getTotal: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));

export const useLocationStore = create((set) => ({
  location: JSON.parse(localStorage.getItem('location')) || {
    address: 'Select Location',
    lat: 28.6139,
    lng: 77.2090,
  },
  
  setLocation: (location) => {
    localStorage.setItem('location', JSON.stringify(location));
    set({ location });
  },
}));
