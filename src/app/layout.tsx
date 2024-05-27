import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Qobolak Badge Generator',
  description:
    'Qobolak Badge Generator is a simple tool to generate badges for your staff members.',
  openGraph: {
    title: 'Qobolak Badge Generator',
    description:
      'Qobolak Badge Generator is a simple tool to generate badges for your staff members.',
    type: 'website',
    locale: 'en_US',
    url: 'https://qobolak-badges.vercel.app',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Qobolak Badge Generator'
      }
    ]
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
