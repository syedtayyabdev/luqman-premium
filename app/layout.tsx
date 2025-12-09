import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "LUQMAN ENTERPRISE - Premium Laptops & Headphones",
  description: "Pakistan's Best Online Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${orbitron.variable} bg-gradient-to-br from-blue-950 via-black to-purple-950 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
