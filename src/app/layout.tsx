import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next.js + TypeScript + Tailwind + Zod Demo',
  description: 'โปรเจกต์สำหรับนำเสนอการทำงานของ Next.js พร้อม TypeScript, Tailwind CSS และ Zod',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}