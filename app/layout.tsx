import type { Metadata } from 'next';
import { Inter, Geist, Lusitana } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/navbar/navbar';

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
        <footer className='flex h-30 flex-col items-center justify-center bg-zinc-100 shadow-lg inset-shadow-sm'>
          <p className='text-xl font-semibold'>JTrack &copy; 2026</p>
          <p className='text-muted-foreground text-sm'>
            Start tracking you job application today!
          </p>
        </footer>
      </body>
    </html>
  );
}
