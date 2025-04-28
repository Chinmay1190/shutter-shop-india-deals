
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCategories } from '../../data/products';
import { Sun, Moon, ShoppingCart, Menu, X, Search, IndianRupee } from 'lucide-react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = getCategories();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <IndianRupee className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">ShutterShop</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium transition-colors hover:text-primary flex items-center">
                Products
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block bg-background border rounded-md shadow-lg p-2 min-w-[200px] z-50">
                {categories.map((category) => (
                  <Link 
                    key={category}
                    to={`/category/${category.toLowerCase()}`} 
                    className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/deals" className="text-sm font-medium transition-colors hover:text-primary">
              Deals
            </Link>
            <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="flex items-center relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-sm font-medium py-2 px-4 rounded-md hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {categories.map((category) => (
                <Link 
                  key={category}
                  to={`/category/${category.toLowerCase()}`} 
                  className="text-sm font-medium py-2 px-4 rounded-md hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
              <Link 
                to="/deals" 
                className="text-sm font-medium py-2 px-4 rounded-md hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                Deals
              </Link>
              <Link 
                to="/about" 
                className="text-sm font-medium py-2 px-4 rounded-md hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-sm font-medium py-2 px-4 rounded-md hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
