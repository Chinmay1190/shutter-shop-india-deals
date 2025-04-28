
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-muted">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Elevate Your Photography With Premium Gear
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-lg">
              Explore our wide selection of top-quality cameras, lenses, and accessories from the world's leading brands.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="px-6">
                <Link to="/category/cameras">Shop Cameras</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6">
                <Link to="/deals">View Deals</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/products/sony-a1.jpg" 
                alt="Featured Camera" 
                className="object-cover object-center w-full h-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-primary/10 backdrop-blur-2xl z-10"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-secondary/20 backdrop-blur-xl z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
