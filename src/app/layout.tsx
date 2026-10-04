import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const descricao =
  "Centralize Google Ads, Meta Ads and e-commerce in a single dashboard. See which channel actually drove each sale and stop wasting time on manual reports.";

export const metadata: Metadata = {
  metadataBase: new URL("https://getdashia.com.br"),
  title: "GetDashia — Multi-channel attribution and dashboards",
  description: descricao,
  openGraph: {
    title: "GetDashia — Multi-channel attribution and dashboards",
    description: descricao,
    url: "https://getdashia.com.br",
    siteName: "GetDashia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetDashia — Multi-channel attribution and dashboards",
    description: descricao,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18379845957"
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18379845957');
        `}
      </Script>
      <body className="min-h-full flex flex-col bg-zinc-950">{children}</body>
    </html>
  );
}
