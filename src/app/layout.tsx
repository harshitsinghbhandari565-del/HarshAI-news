import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HarshAI — India\'s AI News & Intelligence',
  description: 'HarshAI aggregates India\'s most important AI news in real time — top AI models, global breakthroughs, and India\'s AI revolution. AI-summarized. Always updated.',
  keywords: ['AI news India', 'artificial intelligence news', 'HarshAI', 'India AI news', 'AI news today', 'machine learning news India'],
  authors: [{ name: 'HarshAI' }],
  creator: 'HarshAI',
  openGraph: {
    type: 'website',
    url: 'https://harshai.vercel.app',
    siteName: 'HarshAI',
    title: 'HarshAI — India\'s AI News & Intelligence',
    description: 'India\'s #1 AI news platform. Real-time. AI-summarized. Global & India coverage.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HarshAI — India\'s AI News',
    description: 'Real-time AI news for India. AI-summarized.',
    creator: '@HarshAINews',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#050508' }}>
        {children}
      </body>
    </html>
  )
}
