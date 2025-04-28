
import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About ShutterShop</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            Welcome to ShutterShop India - your premier destination for high-quality cameras, lenses, and photography accessories. Since our founding in 2010, we've been passionate about helping photographers of all skill levels find the perfect equipment for their creative vision.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
          <p>
            ShutterShop began with a simple idea: to create a specialized store where photographers could find premium equipment with expert advice. What started as a small shop in Mumbai has grown into one of India's leading photography retailers, with an extensive online presence and physical stores in major cities across the country.
          </p>
          
          <div className="my-8 aspect-video rounded-lg overflow-hidden">
            <img 
              src="/products/sony-a1.jpg" 
              alt="ShutterShop Showroom" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            At ShutterShop, we believe that everyone deserves access to quality photography equipment. Our mission is to provide photographers with the best tools, exceptional service, and expert knowledge to help them capture their perfect moment.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose ShutterShop?</h2>
          <ul className="space-y-2">
            <li><strong>Authentic Products:</strong> We only sell genuine products sourced directly from authorized distributors.</li>
            <li><strong>Expert Advice:</strong> Our team consists of passionate photographers ready to assist you.</li>
            <li><strong>Competitive Pricing:</strong> We offer the best prices without compromising on quality or service.</li>
            <li><strong>Fast Shipping:</strong> Enjoy fast and reliable delivery across India.</li>
            <li><strong>Excellent Support:</strong> Our customer service team is always ready to help you before and after your purchase.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Visit Us</h2>
          <p>
            We invite you to visit one of our physical stores located in Mumbai, Delhi, Bangalore, and Chennai. Our knowledgeable staff will be happy to assist you in finding the perfect equipment for your needs.
          </p>
          
          <div className="mt-8 flex justify-center">
            <Link to="/contact" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
