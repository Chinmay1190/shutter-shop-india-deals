
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { getBrands, getCategories, getPriceRange } from '../../data/products';
import { ProductFilter } from '../../types/product';

interface ProductFilterSidebarProps {
  filter: ProductFilter;
  onFilterChange: (filter: ProductFilter) => void;
}

const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  filter,
  onFilterChange,
}) => {
  const brands = getBrands();
  const categories = getCategories();
  const [minMax] = useState(getPriceRange());

  const handleCategoryChange = (category: string) => {
    const updatedCategories = filter.categories.includes(category)
      ? filter.categories.filter((c) => c !== category)
      : [...filter.categories, category];
    
    onFilterChange({
      ...filter,
      categories: updatedCategories,
    });
  };

  const handleBrandChange = (brand: string) => {
    const updatedBrands = filter.brands.includes(brand)
      ? filter.brands.filter((b) => b !== brand)
      : [...filter.brands, brand];
    
    onFilterChange({
      ...filter,
      brands: updatedBrands,
    });
  };

  const handlePriceChange = (value: number[]) => {
    onFilterChange({
      ...filter,
      priceRange: [value[0], value[1]],
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <aside className="w-full lg:w-64">
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-lg mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filter.categories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm cursor-pointer"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-3">Brands</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filter.brands.includes(brand)}
                  onCheckedChange={() => handleBrandChange(brand)}
                />
                <label
                  htmlFor={`brand-${brand}`}
                  className="text-sm cursor-pointer"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">Price Range</h3>
          <Slider
            defaultValue={[minMax[0], minMax[1]]}
            min={minMax[0]}
            max={minMax[1]}
            step={1000}
            value={[filter.priceRange[0], filter.priceRange[1]]}
            onValueChange={handlePriceChange}
            className="mb-6"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {formatPrice(filter.priceRange[0])}
            </span>
            <span className="text-sm">
              {formatPrice(filter.priceRange[1])}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProductFilterSidebar;
