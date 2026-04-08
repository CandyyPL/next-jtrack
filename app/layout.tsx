import type { Metadata } from 'next';
import { Inter, Geist, Lusitana } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/navbar';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '700'],
  subsets: ['latin'],
});

const lusitana = Lusitana({
  variable: '--font-lusitana',
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JTrack',
  description: 'Job Application Tracker',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={cn(
        'h-full font-sans antialiased',
        inter.variable,
        geist.variable,
        lusitana.variable
      )}>
      <body className='flex min-h-full flex-col'>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
