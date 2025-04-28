
import React from 'react';
import { Link } from 'react-router-dom';
import { IndianRupee } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link to="/" className="flex items-center">
              <IndianRupee className="h-6 w-6 mr-2" />
              <span className="text-lg font-bold">ShutterShop</span>
            </Link>
            <p className="text-sm">
              Your one-stop destination for premium cameras and photography equipment in India.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/category/cameras" className="text-sm hover:underline">Cameras</Link></li>
              <li><Link to="/category/lenses" className="text-sm hover:underline">Lenses</Link></li>
              <li><Link to="/category/accessories" className="text-sm hover:underline">Accessories</Link></li>
              <li><Link to="/deals" className="text-sm hover:underline">Deals & Offers</Link></li>
              <li><Link to="/new-arrivals" className="text-sm hover:underline">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="text-sm hover:underline">Contact</Link></li>
              <li><Link to="/careers" className="text-sm hover:underline">Careers</Link></li>
              <li><Link to="/blog" className="text-sm hover:underline">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-sm hover:underline">Help Center</Link></li>
              <li><Link to="/shipping" className="text-sm hover:underline">Shipping Information</Link></li>
              <li><Link to="/returns" className="text-sm hover:underline">Returns & Exchanges</Link></li>
              <li><Link to="/warranty" className="text-sm hover:underline">Warranty</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
              &copy; {year} ShutterShop India. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-sm hover:underline">Privacy Policy</Link>
              <Link to="/terms" className="text-sm hover:underline">Terms of Service</Link>
              <Link to="/sitemap" className="text-sm hover:underline">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
