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
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ id: data.id, name: data.name, email: data.email }));
      setUser({ id: data.id, name: data.name, email: data.email });
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
    <div className="bg-[#1a1a1adc] p-8 justify-center items-center flex flex-col h-screen">
      <div className="w-1/4 p-6 h-3/4 bg-gray-200 flex flex-col justify-center rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Seja Bem Vindo!</h2>
        <p className="mb-2">Acesse sua conta e domine seu mercado</p>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="email"
            {...register('email', { required: 'Email é obrigatório' })}
            placeholder="Email"
            className="block w-full p-2 border rounded text-black"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input type="password"
            {...register('password', { required: 'Senha é obrigatória' })}
            placeholder="Password"
            className="block w-full p-2 border rounded text-black"
          />
          {errors.password && <p className="text-red-700">{errors.password.message}</p>}
          <button type="submit" className="block mx-auto text-black px-4 py-2 rounded bg-gray-400 hover:bg-gray-700 transition duration-300 ease-in-out" disabled={isSubmitting}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
