import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Cargando...</div>;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;