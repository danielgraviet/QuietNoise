import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import NavBar from "../components/NavBar";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'QuietNoise Tech Blog – Latest Tech News Without the Noise',
    template: '%s | QuietNoise'
  },
  description: 'Looking for captivating tech content without the noise? Welcome to QuietNoise Tech Blog! No ads, no sponsored content, just insights and inspiration.',
  keywords: ['blog', 'technology', 'writing', 'tech blog', 'tech insights', 'tech inspiration'],
  openGraph: {
    title: 'QuietNoise Tech Blog – Latest Tech News Without the Noise',
    description: 'Looking for captivating tech content without the noise? Welcome to QuietNoise Tech Blog! No ads, no sponsored content, just insights and inspiration.',
    url: 'https://yourdomain.com', // replace with actual domain
    siteName: 'QuietNoise Tech Blog',
    images: [
      {
        url: '/images/og-image.jpg', // replace with actual image
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.className}>
      <body>
        <ThemeProvider>
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
