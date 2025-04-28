
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const OrderSuccessPage = () => {
  // Generate a random order ID
  const orderId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Order Successfully Placed!</h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been received.
        </p>
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Order Details</h2>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="font-medium">Order Number</div>
          <div>#{orderId}</div>
          
          <div className="font-medium">Date</div>
          <div>{new Date().toLocaleDateString()}</div>
          
          <div className="font-medium">Payment Method</div>
          <div>Credit Card</div>
          
          <div className="font-medium">Shipping Method</div>
          <div>Standard Shipping (3-5 business days)</div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">What's Next?</h2>
        
        <ul className="space-y-3 text-sm">
          <li className="flex items-start">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground font-medium mr-3 mt-0.5">
              1
            </div>
            <div>
              <strong>Order Confirmation Email</strong>
              <p className="text-muted-foreground mt-1">
                You will receive an email confirmation with your order details shortly.
              </p>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground font-medium mr-3 mt-0.5">
              2
            </div>
            <div>
              <strong>Order Processing</strong>
              <p className="text-muted-foreground mt-1">
                We will begin processing your order immediately.
              </p>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground font-medium mr-3 mt-0.5">
              3
            </div>
            <div>
              <strong>Shipping</strong>
              <p className="text-muted-foreground mt-1">
                Once your order is processed, we'll ship your items and send you a tracking number.
              </p>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground font-medium mr-3 mt-0.5">
              4
            </div>
            <div>
              <strong>Delivery</strong>
              <p className="text-muted-foreground mt-1">
                Your order will be delivered to your address within the estimated delivery timeframe.
              </p>
            </div>
          </li>
        </ul>
      </div>
      
      <div className="text-center space-y-4">
        <Button asChild className="px-6">
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
