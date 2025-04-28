
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilterSidebar from '../components/product/ProductFilterSidebar';
import { products, getCategories, getBrands, getPriceRange } from '../data/products';
import { ProductFilter } from '../types/product';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';

const ProductsPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState<ProductFilter>({
    categories: [],
    brands: [],
    priceRange: getPriceRange(),
  });

  // Initialize filters based on the category parameter
  useEffect(() => {
    if (category) {
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      if (getCategories().includes(formattedCategory)) {
        setFilter((prevFilter) => ({
          ...prevFilter,
          categories: [formattedCategory],
        }));
      }
    }
  }, [category]);

  // Filter products based on filter state and search query
  const filteredProducts = products.filter((product) => {
    // Filter by categories
    if (filter.categories.length > 0 && !filter.categories.includes(product.category)) {
      return false;
    }

    // Filter by brands
    if (filter.brands.length > 0 && !filter.brands.includes(product.brand)) {
      return false;
    }

    // Filter by price range
    if (
      product.price < filter.priceRange[0] ||
      product.price > filter.priceRange[1]
    ) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Get page title
  const getPageTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    } else if (category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    } else {
      return 'All Products';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">{getPageTitle()}</h1>
        <p className="text-muted-foreground mt-2">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="w-full"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        {/* Filters sidebar */}
        <div className={`${showFilters || 'hidden lg:block'} lg:w-64 flex-shrink-0`}>
          <ProductFilterSidebar filter={filter} onFilterChange={setFilter} />
        </div>

        {/* Product grid */}
        <div className="flex-1">
          <ProductGrid products={filteredProducts} columns={3} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
