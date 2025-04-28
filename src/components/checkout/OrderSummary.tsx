
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import FormattedPrice from '../ui/FormattedPrice';

const OrderSummary = () => {
  const { cart, cartTotal } = useCart();
  
  // Calculate subtotal
  const subtotal = cartTotal;
  
  // Calculate tax (assuming 18% GST)
  const taxRate = 0.18;
  const tax = subtotal * taxRate;
  
  // Calculate shipping (free over ₹10,000, otherwise ₹500)
  const shippingCost = subtotal > 10000 ? 0 : 500;
  
  // Calculate total
  const total = subtotal + tax + shippingCost;

  return (
    <div className="bg-muted rounded-lg p-6">
      <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
      
      <div className="space-y-4">
        <div className="max-h-80 overflow-auto space-y-4 pr-2">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <div className="bg-background h-16 w-16 rounded-md overflow-hidden border flex-shrink-0">
                <img 
                  src={item.imageUrl || "/placeholder.svg"} 
                  alt={item.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <FormattedPrice price={item.price * item.quantity} className="text-sm font-semibold" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <FormattedPrice price={subtotal} />
          </div>
          
          <div className="flex justify-between">
            <span>Tax (18% GST)</span>
            <FormattedPrice price={tax} />
          </div>
          
          <div className="flex justify-between">
            <span>Shipping</span>
            {shippingCost === 0 ? 
              <span className="text-green-600 dark:text-green-400">Free</span> : 
              <FormattedPrice price={shippingCost} />
            }
          </div>
          
          <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
            <span>Total</span>
            <FormattedPrice price={total} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
