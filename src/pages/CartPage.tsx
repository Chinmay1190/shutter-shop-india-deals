
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const CartPage = () => {
  const { cart, clearCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-16 space-y-6">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="text-xl font-medium">Your cart is empty</h2>
          <p className="text-muted-foreground">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild className="mt-4">
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">
                  Cart Items ({cart.length})
                </h2>
                <Button variant="ghost" size="sm" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
              
              <div className="divide-y">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
