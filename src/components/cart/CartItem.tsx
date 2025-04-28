
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { useCart } from '../../contexts/CartContext';
import { Button } from '@/components/ui/button';
import FormattedPrice from '../ui/FormattedPrice';
import { Trash2, Minus, Plus } from 'lucide-react';

interface CartItemProps {
  item: Product & { quantity: number };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="flex items-start py-6 border-b">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
        <Link to={`/product/${item.id}`}>
          <img
            src={item.imageUrl || "/placeholder.svg"}
            alt={item.name}
            className="h-full w-full object-cover object-center"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </Link>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <Link 
              to={`/product/${item.id}`}
              className="text-lg font-medium hover:underline"
            >
              {item.name}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              {item.brand}
            </p>
          </div>
          <div className="text-right">
            <FormattedPrice price={item.price} className="text-lg font-semibold" />
            {item.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                <FormattedPrice price={item.originalPrice} iconSize={3} />
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-md">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={handleDecreaseQuantity}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="px-2 text-sm font-medium">
              {item.quantity}
            </span>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={handleIncreaseQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive/90"
            onClick={() => removeFromCart(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
