import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GameGuide Hub - 遊戲攻略中心",
  description: "專業的遊戲攻略分享平台，提供最新最完整的遊戲攻略、心得分享和社群交流。",
  keywords: "遊戲攻略, 遊戲指南, 遊戲心得, 遊戲社群, GameGuide",
  authors: [{ name: "GameGuide Hub Team" }],
  creator: "GameGuide Hub",
  publisher: "GameGuide Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gameguide-hub.vercel.app'),
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "/",
    title: "GameGuide Hub - 遊戲攻略中心",
    description: "專業的遊戲攻略分享平台，提供最新最完整的遊戲攻略、心得分享和社群交流。",
    siteName: "GameGuide Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "GameGuide Hub - 遊戲攻略中心",
    description: "專業的遊戲攻略分享平台，提供最新最完整的遊戲攻略、心得分享和社群交流。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
