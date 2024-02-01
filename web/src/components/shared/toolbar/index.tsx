'use client';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import Link from 'next/link';
import { userAtom } from '@/store/user.store';
import { useAtom } from 'jotai';

export default function ToolbarComponent() {
  const [userId, setUserId] = useAtom(userAtom);

  return (
    <AppBar position="static">
      <Toolbar sx={{ bgcolor: '#283593' }}>
        <ChatIcon sx={{ marginRight: '8px' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Quiz
        </Typography>
        <Link href="/login">
          <Button color="inherit">{userId ? 'Sair' : 'Login'}</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
