import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  let effectiveUser = user;
  if (!effectiveUser) {
    try {
      const storedUser = localStorage.getItem('user');
      effectiveUser = storedUser ? JSON.parse(storedUser) : null;
    } catch {
      effectiveUser = null;
    }
  }

  if (!effectiveUser || effectiveUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
