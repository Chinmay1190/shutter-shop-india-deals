
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FormattedPrice from '../components/ui/FormattedPrice';
import ProductGrid from '../components/product/ProductGrid';
import { toast } from 'sonner';
import { ShoppingCart, ChevronLeft, IndianRupee, Minus, Plus } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  // Find the current product
  const product = products.find((p) => p.id === Number(id));
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">Sorry, the product you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }
  
  // Find related products (same category)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  // Handle quantity change
  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
            </li>
            <span className="mx-2 text-muted-foreground">/</span>
            <li>
              <Link 
                to={`/category/${product.category.toLowerCase()}`} 
                className="text-muted-foreground hover:text-foreground"
              >
                {product.category}
              </Link>
            </li>
            <span className="mx-2 text-muted-foreground">/</span>
            <li className="text-foreground font-medium truncate max-w-[200px]">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>
      
      {/* Back button */}
      <Button 
        variant="ghost" 
        size="sm" 
        asChild 
        className="mb-6"
      >
        <Link to={`/category/${product.category.toLowerCase()}`}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to {product.category}
        </Link>
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-muted rounded-lg overflow-hidden">
          <img 
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-auto object-cover aspect-square"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span 
                    key={index}
                    className={`text-sm ${
                      index < Math.floor(product.rating)
                        ? 'text-yellow-500'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">({product.rating})</span>
              </div>
              <span className="mx-3 text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">Brand: {product.brand}</span>
            </div>
          </div>
          
          <div className="flex items-baseline gap-2">
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                <FormattedPrice price={product.originalPrice} />
              </span>
            )}
            <span className="text-2xl font-bold">
              <FormattedPrice price={product.price} />
            </span>
            {product.originalPrice && (
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
          
          <div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <div>
            <p className={`text-sm ${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
          
          <div className="border-t pt-6">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="pt-4">
                <div className="space-y-4">
                  <p>
                    {product.description} This premium quality product is designed to meet professional photography needs.
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Premium quality build</li>
                    <li>1 year manufacturer warranty</li>
                    <li>Genuine {product.brand} product</li>
                    <li>Includes all standard accessories</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Brand</div>
                    <div>{product.brand}</div>
                    
                    <div className="font-medium">Category</div>
                    <div>{product.category}</div>
                    
                    <div className="font-medium">Model Number</div>
                    <div>{`${product.brand.substring(0, 3).toUpperCase()}${product.id}${product.category.substring(0, 3).toUpperCase()}`}</div>
                    
                    <div className="font-medium">Warranty</div>
                    <div>1 Year Manufacturer Warranty</div>
                    
                    <div className="font-medium">Country of Origin</div>
                    <div>Imported</div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="pt-4">
                <div className="space-y-4">
                  <p>
                    We offer fast and reliable shipping across India.
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Free shipping for orders above ₹10,000</li>
                    <li>Standard shipping: 3-5 business days</li>
                    <li>Express shipping: 1-2 business days (additional charges)</li>
                    <li>Cash on Delivery available</li>
                    <li>Easy returns within 7 days</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <ProductGrid products={relatedProducts} columns={4} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
