// Components and pages
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../pages/Login';
import ServiceExplorer from '../pages/ServiceExplorer/index';
import SignupPage from '../pages/Signup';
import MyServices from '../pages/MyServices';
import ProviderProfile from '../pages/ProviderProfile';
import Comments from '../pages/Comments';
import Hirings from '../pages/Hirings';
import LandingPage from '../pages/Home/index';
import ForgotPassword from '../pages/ForgotPassword/index';
import ChangePassword from '../pages/ChangePassword/index';
import RestorePassword from '../pages/RestorePassword/index';
import notFoundImage from '../assets/Logos/notFound.jpg';

function ProtectedRoute({ children }) {
  const isAuthenticated = true; // Aquí puedes verificar si el usuario está autenticado (el que vale es el de dentro de app)
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }
  return children;
}
function NotFoundPage() {
  const notFoundStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  };

  const responsiveImageStyles = {
    maxWidth: '50%', // Asegura que la imagen no exceda el ancho del contenedor
    height: 'auto', // Mantiene la proporción de la imagen
  };

  return (
    <div style={notFoundStyles}>
      <img
        src={notFoundImage}
        alt="Página no encontrada"
        style={responsiveImageStyles}
      />
    </div>
  );
}
// Route paths
export const ROUTE_HOME = '/';
export const ROUTE_FORGOT_PASSWORD = '/forgot-password';
export const ROUTE_CHANGE_PASSWORD = '/change-password';
export const ROUTE_RESTORE_PASSWORD = '/restore-password';
export const ROUTE_LOGIN = '/login';
export const ROUTE_EXPLORE_SERVICES = '/explorar-servicios';
export const ROUTE_SIGNUP = '/registro';
export const ROUTE_MY_SERVICES = '/mis-servicios';
export const ROUTE_PROVIDER_PROFILE = '/perfil-proveedor';
export const ROUTE_COMMENTS = '/comentarios';
export const ROUTE_HIRINGS = '/contrataciones';
export const ROUTE_NOT_FOUND = '*';

// Route elements
export const routesConfig = [
  { path: ROUTE_HOME, element: <LandingPage /> },
  { path: ROUTE_FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: ROUTE_CHANGE_PASSWORD, element: <ChangePassword /> },
  { path: ROUTE_RESTORE_PASSWORD, element: <RestorePassword /> },
  { path: ROUTE_LOGIN, element: <LoginPage /> },
  { path: ROUTE_EXPLORE_SERVICES, element: <ServiceExplorer /> },
  { path: ROUTE_SIGNUP, element: <SignupPage /> },
  {
    path: ROUTE_MY_SERVICES,
    element: (
      <ProtectedRoute>
        <MyServices />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTE_PROVIDER_PROFILE,
    element: (
      <ProtectedRoute>
        <ProviderProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTE_COMMENTS,
    element: (
      <ProtectedRoute>
        <Comments />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTE_HIRINGS,
    element: (
      <ProtectedRoute>
        <Hirings />
      </ProtectedRoute>
    ),
  },
  { path: ROUTE_NOT_FOUND, element: <NotFoundPage /> },
];
