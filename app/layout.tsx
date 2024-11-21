import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import MenuBar from "./components/MenuBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body
        className={`${geistSans.variable} 
        ${geistMono.variable} 
        antialiased mt-8 mr-5 ml-5 bg-gradient-to-b from-purple-50 to-blue-100 flex justify-center h-[100vh] overflow-hidden`}
      >
        {children}
        <MenuBar />
      </body>
    </html>
  );
}
