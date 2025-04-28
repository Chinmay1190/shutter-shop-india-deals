
import React from 'react';
import { products } from '../data/products';
import ProductGrid from '../components/product/ProductGrid';

const DealsPage = () => {
  // Get products that are on sale or have a discount
  const dealsProducts = products.filter((product) => 
    product.isOnSale || (product.originalPrice && product.originalPrice > product.price)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Special Deals & Offers</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Grab these limited-time offers on premium cameras and accessories. 
          All deals are for a limited time only, while supplies last.
        </p>
      </div>
      
      <ProductGrid products={dealsProducts} columns={4} />
    </div>
  );
};

export default DealsPage;
