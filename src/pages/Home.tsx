import { useNavigate } from 'react-router-dom';
import InputOrder from "../components/InputOrder";
import { useOrderStore } from '../store/order';
import { useAuthStore } from '../store/auth';
import Dashboard from '../components/Dashboard';

const Home = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    useOrderStore.getState().resetOrder();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Desafio OnBeef</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="block text-sm text-gray-300">Bem-vindo</span>
              <span className="font-medium">{user?.name || 'Usuário'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn-danger text-sm px-3 py-1.5"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* New order section */}
        <section className="mb-8 flex justify-center">
          <InputOrder />
        </section>

        {/* Dashboard */}
        <section>
          <Dashboard />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} OnBeef - Gestão de Pedidos
        </div>
      </footer>
    </div>
  );
};

export default Home;
