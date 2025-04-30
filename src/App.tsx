import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { useAuthStore } from './store/auth';

const App: React.FC = () => {

  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Login />;
  }
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App
