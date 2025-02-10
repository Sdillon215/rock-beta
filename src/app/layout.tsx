import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rock Beta",
  description: "Rock climbing beta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-100">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <div>
          <NavBar />
        </div>
        <main className="max-w-screen-2xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
