
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PromoBanner = () => {
  return (
    <section className="py-12 md:py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Up to 30% Off on Selected Items!</h2>
            <p className="text-base md:text-lg opacity-90 mb-6">
              Upgrade your gear with our limited-time offers on premium cameras, lenses, and accessories. 
              Don't miss out on these incredible deals!
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/deals">Shop Deals Now</Link>
            </Button>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-secondary/20"></div>
              <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="text-5xl font-bold mb-2">30%</div>
                <div className="text-xl">OFF</div>
                <div className="text-sm mt-1">Limited Time Only</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-secondary/20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
