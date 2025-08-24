"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";

import Navbar from "@/components/organisms/Navbar";
import FloatingActionButtons from "@/components/organisms/FloatingActionButtons";

import { queryClient } from "./QueryClient";

import "./globals.css";
import Footer from "@/components/organisms/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavFooter = pathname.startsWith("/login");

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            {!hideNavFooter && <Navbar />}
            <main className="min-h-screen">{children}</main>
            <Toaster position="top-right" reverseOrder={false} containerStyle={{ top: 50 }} />
            {!hideNavFooter && <FloatingActionButtons />}
            {!hideNavFooter && <Footer/>}
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
