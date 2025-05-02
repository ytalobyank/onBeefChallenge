import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

const Protect = ({ children }: Props) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protect;
