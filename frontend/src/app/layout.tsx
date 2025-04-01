import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import NavBar from "../components/NavBar";
import "../css/globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://quietnoise.com'), // replace with actual domain
  title: {
    default: 'LegalByte: Legal Tech News, IP & Tools Insights',
    template: '%s | LegalByte'
  },
  description: 'Discover legal tech news, IP updates, and tools at LegalByte. Your source for bites of innovation in the legal world.',
  keywords: ['blog', 'technology', 'writing', 'tech blog', 'tech insights', 'tech inspiration'],
  openGraph: {
    title: 'LegalByte: Legal Tech News, IP & Tools Insights',
    description: 'Discover legal tech news, IP updates, and tools at LegalByte. Your source for bites of innovation in the legal world.',
    url: 'https://yourdomain.com', // replace with actual domain
    siteName: 'LegalByte',
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
