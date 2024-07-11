import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar.jsx";
import { AuthContextProvider } from "@/contexts/auth_context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantry Tracker App",
  description: "Track your groceries here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* creating auth context provider at root so it is accessible everywhere */}
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
