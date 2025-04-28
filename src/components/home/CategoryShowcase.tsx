
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { getCategories } from '../../data/products';

const CategoryShowcase = () => {
  const categories = getCategories();
  
  // Map categories to image paths and descriptions
  const categoryDetails = {
    Cameras: {
      image: "/products/canon-eos-r6.jpg",
      description: "Explore our wide range of DSLR, mirrorless, and compact cameras"
    },
    Lenses: {
      image: "/products/sony-24-70.jpg",
      description: "Find the perfect lens for your photography needs"
    },
    Lighting: {
      image: "/products/godox-v1.jpg",
      description: "Professional lighting equipment for studio and outdoor shoots"
    },
    Accessories: {
      image: "/products/peak-design-backpack.jpg", 
      description: "Essential accessories to complete your photography kit"
    },
    Audio: {
      image: "/products/rode-videomic.jpg",
      description: "High-quality audio solutions for video production"
    },
    Drones: {
      image: "/products/dji-mavic-3.jpg",
      description: "Cutting-edge drones for stunning aerial photography"
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link to={`/category/${category.toLowerCase()}`} key={category}>
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={categoryDetails[category as keyof typeof categoryDetails]?.image || "/placeholder.svg"}
                    alt={category}
                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-semibold">{category}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    {categoryDetails[category as keyof typeof categoryDetails]?.description || `Shop all ${category.toLowerCase()}`}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
