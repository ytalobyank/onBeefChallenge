import { useNavigate } from 'react-router-dom';
import InputOrder from "../components/InputOrder";
import { useOrderStore } from '../store/order';
import { useAuthStore } from '../store/auth';
import Dashboard from '../components/Dashboard';

const Home = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    useOrderStore.getState().resetOrder();
    navigate('/login');
  };

  return (
    <div className="w-full min-h-screen p-6 bg-[#1a1a1adc] flex flex-col justify-start items-center">
      <div className="bg-gray-200 w-full p-6 h-1/4 flex flex-col justify-center items-center rounded-2xl shadow-lg">
        <h2 className="text-black text-3xl font-bold text-center">Desafio Onbeef</h2>
      </div>

      <div className="flex w-full items-center mt-4 relative">
        <div className="absolute left-0">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        <div className="mx-auto">
          <InputOrder />
        </div>
      </div>

      <div className="w-full flex flex-row justify-around gap-4 mt-6">
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;
