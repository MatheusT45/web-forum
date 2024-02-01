import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Box from '@mui/material/Box';
import ToolbarComponent from '@/components/shared/toolbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web Quiz',
  description: 'Web Quiz app developed with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Box sx={{ flexGrow: 1 }}>
          <ToolbarComponent />
        </Box>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
