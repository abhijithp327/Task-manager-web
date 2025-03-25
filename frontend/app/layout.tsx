import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { store } from "./store/store";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "./providers/providers";
import Header from "./components/header/Header";
import MainContentLayout from "./providers/MainContentLayout";
import SidebarProvider from "./providers/SidebarProvider";
import MainLayout from "./providers/MainLayout";
import MiniSidebar from "./components/miniSidebar/MiniSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>

        <Providers>
          <Toaster />
          <div className="h-full flex overflow-hidden">
            <MiniSidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <MainContentLayout>
                <MainLayout>{children}</MainLayout>
                <SidebarProvider />
              </MainContentLayout>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
};
