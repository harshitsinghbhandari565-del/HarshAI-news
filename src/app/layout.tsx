import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HARSH AI — Real-Time AI News',
  description: 'Top AI model news, global AI breakthroughs, and India AI news — real-time, AI-summarized.',
  keywords: ['AI news', 'artificial intelligence news', 'AI news India', 'LLM news'],
  openGraph: {
    title: 'HARSH AI — Real-Time AI News Global & India',
    description: 'Real-time AI news platform with AI summaries.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
