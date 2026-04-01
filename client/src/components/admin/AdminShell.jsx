import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Products', path: '/admin/products' },
  { label: 'Categories', path: '/admin/categories' },
  { label: 'Services', path: '/admin/services' },
  { label: 'Contacts', path: '/admin/contacts' },
];

const AdminShell = ({ title, subtitle, children, actions }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <header className="bg-[#111111] text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-heading font-bold">{title}</h1>
            {subtitle ? <p className="text-sm text-gray-300 mt-1">{subtitle}</p> : null}
          </div>
          <div className="flex items-center gap-3">
            {actions ? <div>{actions}</div> : null}
            <button type="button" onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        </div>
      </header>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6">
        <nav className="bg-white border border-black/10 rounded-2xl p-3 shadow-sm overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors whitespace-nowrap ${active ? 'border-primary-red bg-red-50 text-black' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <main className="bg-white border border-black/10 rounded-2xl p-5 md:p-7 shadow-sm">{children}</main>
      </div>
    </div>
  );
};

export default AdminShell;
