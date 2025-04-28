
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import FormattedPrice from '../ui/FormattedPrice';

interface CartSummaryProps {
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { cart, cartTotal } = useCart();

  // Calculate subtotal
  const subtotal = cartTotal;
  
  // Calculate tax (assuming 18% GST)
  const taxRate = 0.18;
  const tax = subtotal * taxRate;
  
  // Calculate shipping (free over 10000, otherwise 500)
  const shippingCost = subtotal > 10000 ? 0 : 500;
  
  // Calculate total
  const total = subtotal + tax + shippingCost;
  
  // Calculate discount
  const discount = 0; // You can implement any discount logic here

  return (
    <div className="bg-muted rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal ({cart.length} items)</span>
          <FormattedPrice price={subtotal} />
        </div>
        
        <div className="flex justify-between">
          <span>Tax (18% GST)</span>
          <FormattedPrice price={tax} />
        </div>
        
        <div className="flex justify-between">
          <span>Shipping</span>
          {shippingCost === 0 ? (
            <span className="text-green-600 dark:text-green-400">Free</span>
          ) : (
            <FormattedPrice price={shippingCost} />
          )}
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span>Discount</span>
            <span>-<FormattedPrice price={discount} /></span>
          </div>
        )}
        
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <FormattedPrice price={total} />
          </div>
        </div>
        
        {shippingCost > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            Add <FormattedPrice price={10000 - subtotal} /> more to get free shipping
          </p>
        )}
      </div>
      
      {onCheckout ? (
        <Button 
          className="w-full mt-4" 
          onClick={onCheckout}
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </Button>
      ) : (
        <Button 
          className="w-full mt-4" 
          disabled={cart.length === 0}
          asChild
        >
          <Link to="/checkout">
            Proceed to Checkout
          </Link>
        </Button>
      )}
      
      <Link to="/" className="block text-center text-sm underline mt-4">
        Continue Shopping
      </Link>
    </div>
  );
};

export default CartSummary;
