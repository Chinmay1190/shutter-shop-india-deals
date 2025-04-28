
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductGrid from '../product/ProductGrid';
import { products } from '../../data/products';

const BestSellers = () => {
  const bestSellerProducts = products
    .filter((product) => product.isBestSeller)
    .slice(0, 4);

  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Best Sellers</h2>
          <Button asChild variant="outline">
            <Link to="/best-sellers">View All</Link>
          </Button>
        </div>
        <ProductGrid products={bestSellerProducts} />
      </div>
    </section>
  );
};

export default BestSellers;
