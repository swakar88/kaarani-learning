import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { KaaraniProvider } from "@/context/KaaraniContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaarani — Learn Power BI with data you love",
  description:
    "A story-first Power BI learning portal. Choose your flavor — cricket, movies, stocks — and learn through real examples.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col" style={{ backgroundColor: "#F8FAFC" }}>
        <KaaraniProvider>{children}</KaaraniProvider>
      </body>
    </html>
  );
}
