import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CompanyProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== 'company') {
    return <Navigate to="/company/login" replace />;
  }

  return <Outlet />;
};

export default CompanyProtectedRoute; 