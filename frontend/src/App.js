import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AuthPage from "./components/AuthPage";
import UploadProduct from "./components/UploadProduct";
import RequireAuth from "./components/RequireAuth";

import { CartProvider } from "./context/CartContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function App() {
  return (

    <CartProvider>

      <AuthProvider>

        <BrowserRouter>

          <AppShell />

        </BrowserRouter>

      </AuthProvider>

    </CartProvider>

  );
}

function AppShell() {
  const { user, logout, isReady } = useContext(AuthContext);

  if (!isReady) {
    return null;
  };

  return (
    <>
      <div className="header">

        <h2>My E-Commerce Store</h2>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          {user && <Link to="/upload">Sell</Link>}
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>

        {user ? (
          <div className="header-account">
            <span>Hi, {user.name}</span>
            <button className="header-logout" type="button" onClick={logout}>Logout</button>
          </div>
        ) : (
          <p className="header-subtitle">Sign in to save time at checkout.</p>
        )}

      </div>

      <div className="container">

        <Routes>

          <Route path="/" element={<ProductList />} />

          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />

          <Route path="/auth" element={<AuthPage />} />

          <Route path="/login" element={<Navigate to="/auth?mode=login" replace />} />

          <Route path="/signup" element={<Navigate to="/auth?mode=register" replace />} />

          <Route path="/upload" element={<RequireAuth><UploadProduct /></RequireAuth>} />

        </Routes>

      </div>

    </>

  );
}

export default App;