'use client';

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { login } from '@/services/auth.service';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/user.store';

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { push } = useRouter();

  const [userId, setUserId] = useAtom(userAtom);

  useEffect(() => {
    setUserId(null);
  }, []);

  const onSubmit = async (data: any) => {
    const response = await login(data);
    setUserId(response.id);
    push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '3rem',
          width: '100%',
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Container
              sx={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <TextField
                id="cpf"
                label="CPF"
                {...register('cpf')}
                placeholder="CPF"
              />
              <TextField
                id="password"
                label="Senha"
                {...register('password')}
                placeholder="Senha"
                type="password"
              />
            </Container>
          </CardContent>
          <CardActions>
            <Button variant="contained" type="submit">
              Entrar
            </Button>
          </CardActions>
        </Card>
      </Box>
    </form>
  );
}
