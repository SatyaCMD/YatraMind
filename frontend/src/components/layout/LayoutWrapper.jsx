'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import SessionManager from '../auth/SessionManager';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAuthPage = ['/login', '/signup', '/verify'].includes(pathname);

  // If Auth Page, hide Navbar, hide Footer, and remove extra padding
  if (isAuthPage) {
     return <main className="flex-grow">{children}</main>;
  }

  // Normal pages get Navbar, layout padding, and Footer
  return (
    <>
      <SessionManager />
      <Navbar />
      <main className="flex-grow pt-[120px] pb-12">
        {children}
      </main>
      <Footer />
    </>
  );
}
