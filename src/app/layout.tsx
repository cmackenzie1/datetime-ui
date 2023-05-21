import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Now',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="
        container
        flex
        md:mx-auto
        bg-slate-100
        text-slate-900
       "
      >
        {children}
      </body>
    </html>
  );
}
