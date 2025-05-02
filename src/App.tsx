import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PublicRoute from './components/PublicRoute';
import Protect from './components/protect';
import { useAuthStore } from './store/auth';


const App: React.FC = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <Protect>
            <Home />
          </Protect>
        }
      />
      <Route
        path="*"
        element={
          isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};

export default App;
