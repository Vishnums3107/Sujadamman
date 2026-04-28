import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaSignOutAlt, 
  FaUserShield 
} from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/logo/brand-logo.png"
              alt="Sujadamman and Subpy logo"
              className="h-12 w-auto object-contain"
            />
            <span className="font-heading font-bold text-2xl text-black tracking-wide">
              Sujadamman and Subpy 
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-black font-semibold px-2 py-2 transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-primary-red after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 border border-black/10"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-red flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <span className="text-sm font-semibold text-black">
                    {user.name}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg py-2 bg-white border border-black/10">
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <div className="p-2 rounded-lg bg-red-50">
                          <FaUserShield className="text-primary-red" />
                        </div>
                        <span className="text-black font-medium">Admin Panel</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 w-full text-left transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-red-50">
                        <FaSignOutAlt className="text-primary-red" />
                      </div>
                      <span className="text-black font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-all"
          >
            {isOpen ? (
              <FaTimes className="text-2xl text-black" />
            ) : (
              <FaBars className="text-2xl text-black" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-black/10 animate-slide-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-3 px-4 text-black hover:bg-gray-100 rounded-lg font-medium transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-black/10 mt-4 pt-4 space-y-2">
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-gray-100 transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaUserShield className="text-primary-red text-lg" />
                      <span className="text-black font-medium">Admin Panel</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-3 py-3 px-4 w-full rounded-lg hover:bg-red-50 transition-all"
                  >
                    <FaSignOutAlt className="text-primary-red text-lg" />
                    <span className="text-black font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="btn-primary w-full text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
