import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  "Centralize Google Ads, Meta Ads e e-commerce em um painel único. Veja qual canal realmente gerou cada venda e pare de perder tempo com relatórios manuais.";

export const metadata: Metadata = {
  metadataBase: new URL("https://getdashia.com.br"),
  title: "GetDashia — Atribuição multi-canal para gestores de tráfego",
  description: descricao,
  openGraph: {
    title: "GetDashia — Atribuição multi-canal para gestores de tráfego",
    description: descricao,
    url: "https://getdashia.com.br",
    siteName: "GetDashia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetDashia — Atribuição multi-canal para gestores de tráfego",
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
      <body className="min-h-full flex flex-col bg-zinc-950">{children}</body>
    </html>
  );
}
