// import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider as NextThemesProvider } from "next-themes";

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
      <body className={` antialiased `}>
        <AuthProvider>
          <ThemeProvider>
            {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
        > */}
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
