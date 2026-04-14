import type { Metadata } from "next";
import { Inter, Noto_Sans_Ethiopic, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-amharic",
  subsets: ["ethiopic"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STRATA | Precision Sampling Engine",
  description: "Advanced statistical sampling, bias analysis, and distribution modeling platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
          integrity="sha384-G79gpG75QOO9cdqe8l3+uKUXC9koQH/QH9DQSDptZkh/+YePFLzpMkbGVnivCJ6U"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.variable} ${notoEthiopic.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
