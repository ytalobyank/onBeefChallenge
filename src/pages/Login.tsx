// src/pages/Login.tsx
const Login = () => {
    return (
      <div className="p-8 justify-center items-center flex flex-col h-screen">
        <h1 className="text-3xl font-bold">Login Page</h1>
        <form className="mt-4 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="block w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full p-2 border rounded"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </form>
      </div>
    );
  };
  
  export default Login;
  