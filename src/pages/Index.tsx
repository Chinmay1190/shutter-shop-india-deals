
import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryShowcase from '../components/home/CategoryShowcase';
import BestSellers from '../components/home/BestSellers';
import OnSaleProducts from '../components/home/OnSaleProducts';
import PromoBanner from '../components/home/PromoBanner';

const Index = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <CategoryShowcase />
      <PromoBanner />
      <BestSellers />
      <OnSaleProducts />
    </div>
  );
};

export default Index;
