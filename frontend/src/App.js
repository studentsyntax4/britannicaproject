import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import { AdminProvider } from './context/AdminContext';
import { Toaster } from './components/ui/sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import About from './pages/About';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';

function AppShell() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      {!isAdmin && <CartDrawer />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!isAdmin && <Footer />}
      <Toaster position="top-center" />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <AdminProvider>
        <ProductsProvider>
          <CartProvider>
            <BrowserRouter>
              <AppShell />
            </BrowserRouter>
          </CartProvider>
        </ProductsProvider>
      </AdminProvider>
    </div>
  );
}

export default App;
