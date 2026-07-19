import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/cursor";
import PageTransitionLoader from "@/components/pagetransitionloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subham Tomar | Software Engineer & AI/ML Enthusiast",
  description: "Portfolio of Subham Tomar - specialized in building AI-powered applications, machine learning models, and premium next-generation user experiences.",
  openGraph: {
    title: "Subham Tomar | Software Engineer & AI/ML Enthusiast",
    description: "Portfolio of Subham Tomar - specialized in building AI-powered applications, machine learning models, and premium next-generation user experiences.",
    url: "https://subhamtomar.dev",
    siteName: "Subham Tomar Portfolio",
    images: [
      {
        url: "https://subhamtomar.dev/avatar.png",
        width: 1200,
        height: 630,
        alt: "Subham Tomar Profile",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subham Tomar | Software Engineer & AI/ML Enthusiast",
    description: "Portfolio of Subham Tomar - specialized in building AI-powered applications, machine learning models, and premium next-generation user experiences.",
    images: ["https://subhamtomar.dev/avatar.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <Cursor />
        <PageTransitionLoader />
        {children}
      </body>
    </html>
  );
}
