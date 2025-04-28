
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { useCart } from '../../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, IndianRupee } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <div className="aspect-square overflow-hidden">
            <img 
              src={product.imageUrl || "/placeholder.svg"} 
              alt={product.name}
              className="product-image group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
            )}
            {product.isBestSeller && (
              <Badge className="bg-orange-500 hover:bg-orange-600">Best Seller</Badge>
            )}
            {product.isOnSale && (
              <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="product-title">{product.name}</h3>
          
          <div className="mt-1.5 mb-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <span 
                  key={index}
                  className={`text-xs ${
                    index < Math.floor(product.rating)
                      ? 'text-yellow-500'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="ml-1 text-xs text-muted-foreground">({product.rating})</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through mr-2">
                  <IndianRupee className="h-3 w-3 inline" />
                  {formatPrice(product.originalPrice).replace('₹', '')}
                </span>
              )}
              <span className="product-price">
                <IndianRupee className="h-4 w-4 inline" /> 
                {formatPrice(product.price).replace('₹', '')}
              </span>
            </div>
            
            <Button
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
