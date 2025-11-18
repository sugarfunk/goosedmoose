import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Goosed Moose | Artisan Candles and Crafts",
    template: "%s | Goosed Moose"
  },
  description: "Hand-poured artisan candles made with natural soy wax and wooden wicks. Handcrafted with love in Macedonia, GA.",
  keywords: ["candles", "artisan candles", "soy candles", "wooden wick candles", "handmade candles", "Georgia candles"],
  authors: [{ name: "Goosed Moose" }],
  creator: "Goosed Moose",
  publisher: "Goosed Moose",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Goosed Moose",
    title: "Goosed Moose | Artisan Candles and Crafts",
    description: "Hand-poured artisan candles made with natural soy wax and wooden wicks.",
    images: [
      {
        url: "/images/brand/goosedmoose_raisedgoose_withtitle_white.png",
        width: 1030,
        height: 574,
        alt: "Goosed Moose Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Goosed Moose | Artisan Candles and Crafts",
    description: "Hand-poured artisan candles made with natural soy wax and wooden wicks.",
    images: ["/images/brand/goosedmoose_raisedgoose_withtitle_white.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
