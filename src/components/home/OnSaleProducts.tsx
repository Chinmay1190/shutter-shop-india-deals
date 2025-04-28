
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductGrid from '../product/ProductGrid';
import { products } from '../../data/products';

const OnSaleProducts = () => {
  const onSaleProducts = products
    .filter((product) => product.isOnSale)
    .slice(0, 4);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Special Offers</h2>
          <Button asChild variant="outline">
            <Link to="/deals">View All Deals</Link>
          </Button>
        </div>
        <ProductGrid products={onSaleProducts} />
      </div>
    </section>
  );
};

export default OnSaleProducts;
