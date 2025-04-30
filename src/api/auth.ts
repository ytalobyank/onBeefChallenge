export type LoginInput = {
    email: string;
    password: string;
  };
  
  export type LoginResponse = {
    id: number;
    name: string;
    email: string;
    token: string;
  };
  export const login = async ({ email, password }: LoginInput): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'teste@hotmail.com' && password === '123') {
          resolve({
            id: 1,
            name: 'teste',
            email,
            token: 'fake-jwt-token',
          });
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 1000);
    });
  };
  