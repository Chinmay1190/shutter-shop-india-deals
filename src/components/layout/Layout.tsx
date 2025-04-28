
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { CartProvider } from '../../contexts/CartContext';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
};

export default Layout;
