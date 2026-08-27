import React from 'react';
import Navbar from '@/components/layout/Navbar';
import ConditionalFooter from '@/components/layout/ConditionalFooter';
import './globals.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow px-4 sm:px-6 lg:px-8">{children}</main>
          <ConditionalFooter />
        </div>
      </body>
    </html>
  );
};

export const metadata = {
  title: 'My Next.js App',
  description: 'A services marketplace built with Next.js',
};

export default Layout;