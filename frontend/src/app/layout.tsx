import { Manrope } from 'next/font/google';
import './globals.css'
import type { Metadata } from 'next'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  // If you want specific weights:
  weight: ['200', '300', '400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: 'QuietNoise',
  description: 'A simple blog application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        {children}
      </body>
    </html>
  )
}
