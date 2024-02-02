'use client';

import { userAtom } from '@/store/user.store';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userId, setUserId] = useAtom(userAtom);
  const { push } = useRouter();

  useEffect(() => {
    if (!userId) {
      console.log('LAYOUT');
      push('/login');
    }
  }, []);

  return <main>{children}</main>;
}
