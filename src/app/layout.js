// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Task Management System",
  description: "A personal task management system built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased `}>{children}</body>
    </html>
  );
}
