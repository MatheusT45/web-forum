type LoginDto = {
  cpf: string;
  password: string;
};

export const login = async ({ cpf, password }: LoginDto) => {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cpf, password }),
  });

  return await response.json();
};
