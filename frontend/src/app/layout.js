import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "../components/providers/StoreProvider";
import LayoutWrapper from "../components/layout/LayoutWrapper";
import AIAssistantBadge from "../components/ai/AIAssistantBadge";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YatraMind | AI-Powered Travel Super App",
  description: "Search, compare, and book flights, hotels, trains, buses, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <div className="min-h-screen bg-slate-50 flex flex-col relative">
            <Toaster 
              position="top-center" 
              toastOptions={{
                duration: 4000,
                style: {
                  padding: '16px 24px',
                  borderRadius: '16px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  fontSize: '15px',
                  fontWeight: '600',
                  backdropFilter: 'blur(8px)'
                },
                success: {
                  style: { background: 'rgba(236, 253, 245, 0.95)', color: '#065f46', border: '1px solid #a7f3d0' },
                  iconTheme: { primary: '#10b981', secondary: '#fff' }
                },
                error: {
                  style: { background: 'rgba(254, 242, 242, 0.95)', color: '#991b1b', border: '1px solid #fecaca' },
                  iconTheme: { primary: '#ef4444', secondary: '#fff' }
                },
                loading: {
                  style: { background: 'rgba(240, 249, 255, 0.95)', color: '#0369a1', border: '1px solid #bae6fd' }
                }
              }}
            />
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
            <AIAssistantBadge />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
