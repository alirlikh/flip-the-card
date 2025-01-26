import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProviders from "./StoreProviders";

export const metadata: Metadata = {
  title: "Flip the Card",
  description: "Flip the Card Game",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${inter.className} font-medium text-xl bg-floralwhite `}
      >
        <StoreProviders>{children}</StoreProviders>
      </body>
    </html>
  );
}
