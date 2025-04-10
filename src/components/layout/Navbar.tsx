
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background/90 backdrop-blur-sm sticky top-0 z-50 w-full border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-legal flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="font-bold text-xl gradient-text">JurisConsult</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-sm font-medium hover:text-legal-primary">Home</Link>
            <Link to="/services" className="px-3 py-2 text-sm font-medium hover:text-legal-primary">Services</Link>
            <Link to="/lawyers" className="px-3 py-2 text-sm font-medium hover:text-legal-primary">Lawyers</Link>
            <Link to="/chatbot" className="px-3 py-2 text-sm font-medium hover:text-legal-primary">AI Assistant</Link>
            <Link to="/about" className="px-3 py-2 text-sm font-medium hover:text-legal-primary">About</Link>
            <Link to="/contact" className="px-3 py-2 text-sm font-medium hover:text-legal-primary">Contact</Link>
            
            <div className="ml-4 flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login" className="flex items-center space-x-1">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </Button>
              
              <Button size="sm" className="bg-legal-primary hover:bg-legal-secondary" asChild>
                <Link to="/register" className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-legal-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 text-base font-medium hover:bg-legal-accent/20 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="block px-3 py-2 text-base font-medium hover:bg-legal-accent/20 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/lawyers" 
              className="block px-3 py-2 text-base font-medium hover:bg-legal-accent/20 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Lawyers
            </Link>
            <Link 
              to="/chatbot" 
              className="block px-3 py-2 text-base font-medium hover:bg-legal-accent/20 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Assistant
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 text-base font-medium hover:bg-legal-accent/20 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 text-base font-medium hover:bg-legal-accent/20 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 pb-3 border-t border-border">
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium hover:bg-legal-accent/20 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 mt-1 text-base font-medium bg-legal-primary text-white rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
