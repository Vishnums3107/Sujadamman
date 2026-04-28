import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAssetPath } from '../utils/assetPath';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth();

  return (
    <footer className="bg-[#111111] text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={getAssetPath('logo/brand-logo.png')}
                alt="Sujadamman and Subpy logo"
                className="h-12 w-auto object-contain"
              />
              <h3 className="text-xl font-heading font-bold text-white">Sujadamman and Subpy </h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              Premium furniture and home essentials crafted for practical comfort and modern spaces.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/products" className="hover:text-white">Products</Link></li>
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Nethimedu, Salem - 636 002</li>
              <li>S. Sekar: 98428 11797</li>
              <li>S. Balaji: 97876 12354</li>
              <li>subpywooden@gmail.com</li>
              <li>sujadamman@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row gap-3 justify-between text-sm text-gray-400">
          <p>© {currentYear} Sujadamman and Subpy . All rights reserved.</p>
          <div className="flex gap-4 items-center">
            <Link to="#" className="hover:text-white">Privacy</Link>
            <Link to="#" className="hover:text-white">Terms</Link>
            {!user && <Link to="/login" className="inline-block w-2 h-2 bg-primary-red rounded-full hover:bg-red-400 transition-colors" title="Login"></Link>}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
