import type { Metadata } from "next";

import { Sora, Roboto } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Darguima.com",
  description: "Personal portfolio of a software developer based in Braga, Portugal. Explore open-source projects and creative tools like SpotHack, Meo WiFi Auto Login, Inovar Proxy, Find Your Friend University, TUB Bus Tracker, and more."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <body
          className={`${sora.variable} ${roboto.variable} antialiased max-w-5xl w-full mx-auto pb-16 px-4 md:px-8`}
        >
          {children}
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
