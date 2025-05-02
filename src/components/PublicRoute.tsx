import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

const PublicRoute = ({ children }: Props) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;
