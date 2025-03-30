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

export const metadata: Metadata = {
  title: "Mediary - Patient Health Made Easy",
  description: "Mediary is your personal health companion, simplifying the way you manage and share your health information. Generate a QR code to share your medical history securely with healthcare providers.",
  openGraph: {
    title: "Mediary - Patient Health Made Easy",
    description: "Mediary is your personal health companion, simplifying the way you manage and share your health information. Generate a QR code to share your medical history securely with healthcare providers.",
    url: "https://mediary.app", // Replace with your actual URL
    siteName: "Mediary",
    images: [
      {
        url: "https://mediary.app/banner.jpg", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Mediary - Patient Health Made Easy",
      },
    ],
    type: "website", // Specify the type of content
    locale: "en_US", // Specify the locale
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
