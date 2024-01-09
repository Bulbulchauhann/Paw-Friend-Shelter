import { Nunito, Lora } from "next/font/google";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import "../styles/globals.css";

// const nunito = Nunito({ subsets: ["latin"], display: "swap" });
export const lora = Lora({ subsets: ["latin"], display: "swap" });

import SessionProvider from "@/providers/session-provider";
import ToastProvider from "@/providers/toast-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ToastProvider />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
