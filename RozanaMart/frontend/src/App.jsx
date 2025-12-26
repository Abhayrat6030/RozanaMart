import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SearchResultsPage from './pages/SearchResultsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import RefundPage from './pages/RefundPage';
import CancellationPage from './pages/CancellationPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />
        <main className="flex-1 overflow-y-auto pb-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products/:categoryId" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderTrackingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="/cancellation" element={<CancellationPage />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
