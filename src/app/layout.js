import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coffee Ordering Mobile Web by Hassan Kaeru",
  description:
    "Say goodbye to waiting in line! Order your favorite coffee from the comfort of your seat and have it delivered directly to you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
