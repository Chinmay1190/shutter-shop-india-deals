
import React from 'react';
import { Product } from '../../types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, columns = 4 }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-4 md:gap-6`}>
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
