
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';

const CheckoutPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  
  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  if (cart.length === 0) {
    return null; // Will redirect to cart
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <CheckoutForm />
          </div>
        </div>
        
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
