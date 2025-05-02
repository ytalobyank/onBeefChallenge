import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { login, LoginResponse, LoginInput } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>();

  const { mutate } = useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(
        { id: data.id, name: data.name, email: data.email },
        data.token
      );
      navigate('/home');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const onSubmit = (data: LoginInput) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Seja Bem-vindo!</h1>
          <p className="mt-2 text-gray-500">Acesse sua conta e domine seu mercado</p>
        </div>
        
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input 
              id="email"
              type="email"
              {...register('email', { required: 'Email é obrigatório' })}
              placeholder="seu@email.com"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input 
              id="password"
              type="password"
              {...register('password', { required: 'Senha é obrigatória' })}
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
