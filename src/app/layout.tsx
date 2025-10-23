import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script"; // <-- 1. IMPORT THE SCRIPT COMPONENT
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import HelmetProviderWrapper from "@/components/HelmetProviderWrapper";
import QueryProvider from "@/components/QueryProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"], 
  variable: "--font-poppins" 
});

export const metadata: Metadata = {
  title: "Branding On the Go | AI-Powered Communication Solutions",
  description: "AI-powered communication solutions for your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <HelmetProviderWrapper>
          <QueryProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Navigation />
              {children}
              <Footer />
            </TooltipProvider>
          </QueryProvider>
        </HelmetProviderWrapper>

        {/* 2. PLACE THE SCRIPT HERE (before the </body> tag) */}
        <Script
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}