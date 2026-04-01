import { lazy, Suspense } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollProgress from './components/ScrollProgress';
import BackToTopButton from './components/BackToTopButton';
import { useAuth } from './context/AuthContext';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices'));
const AdminContacts = lazy(() => import('./pages/admin/AdminContacts'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#111111',
            color: '#FFFFFF',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#d4af37',
              secondary: '#FFFFFF',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#c1121f',
              secondary: '#FFFFFF',
            },
          },
        }}
      />
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main className="flex-grow relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&h=1200&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <Routes location={location}>
                <Route path="/" element={isAdmin ? <Navigate to="/admin" replace /> : <Home />} />
                <Route path="/products" element={isAdmin ? <Navigate to="/admin" replace /> : <Products />} />
                <Route path="/products/:id" element={isAdmin ? <Navigate to="/admin" replace /> : <ProductDetails />} />
                <Route path="/about" element={isAdmin ? <Navigate to="/admin" replace /> : <About />} />
                <Route path="/services" element={isAdmin ? <Navigate to="/admin" replace /> : <Services />} />
                <Route path="/contact" element={isAdmin ? <Navigate to="/admin" replace /> : <Contact />} />
                <Route path="/login" element={isAdmin ? <Navigate to="/admin" replace /> : <Login />} />
                <Route path="/register" element={isAdmin ? <Navigate to="/admin" replace /> : <Register />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
                <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>} />
                <Route path="/admin/services" element={<AdminRoute><AdminServices /></AdminRoute>} />
                <Route path="/admin/contacts" element={<AdminRoute><AdminContacts /></AdminRoute>} />

                <Route path="*" element={isAdmin ? <Navigate to="/admin" replace /> : <NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
        </div>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <BackToTopButton />}
    </div>
  );
}

export default App;
