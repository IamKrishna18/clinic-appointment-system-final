
import { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
  user: any; // You can replace `any` with a proper user type if you have one
}



const Navbar = ({ onLogin, onSignup ,onLogout, user}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">MediCare Connect</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
            <a href="#hospitals" className="text-gray-600 hover:text-blue-600 transition-colors">Hospitals</a>
            <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            {user ? (
  <div className="flex items-center space-x-4">
    <span className="text-gray-700">Welcome, {user.name}</span>
    <Button 
      variant="outline" 
      onClick={onLogout}
      className="text-red-600 border-red-600 hover:bg-red-50"
    >
      Logout
    </Button>
  </div>
) : (
  <>
    <Button
      variant="outline"
      onClick={onLogin}
      className="text-blue-600 border-blue-600 hover:bg-blue-50"
    >
      Login
    </Button>
    <Button
      onClick={onSignup}
      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
    >
      Sign Up
    </Button>
  </>
)}


          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-100 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="#hospitals" className="text-gray-600 hover:text-blue-600 transition-colors">Hospitals</a>
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <div className="flex space-x-4 pt-4">
                <Button 
                  variant="outline" 
                  onClick={onLogin}
                  className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  Login
                </Button>
                <Button 
                  onClick={onSignup}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
