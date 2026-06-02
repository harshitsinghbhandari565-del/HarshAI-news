// ============================================================
// NEXUS AI — Main Homepage
// Futuristic AI News Aggregation Platform
// ============================================================

import { Suspense } from 'react'
import { Metadata } from 'next'
import NexusHomepage from '@/components/NexusHomepage'
import { NewsLoadingSkeleton } from '@/components/LoadingSkeletons'

export const metadata: Metadata = {
  title: 'NEXUS AI — Real-Time AI News Global & India',
  description: 'The world\'s most advanced AI news platform. Top AI models, global breakthroughs, and India\'s AI revolution — all AI-summarized and updated in real time.',
}

async function getNews() {
  try {
    // Server-side fetch for SSR
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/news`, {
      next: { revalidate: 1800 }, // Revalidate every 30 minutes (ISR)
    })

    if (!response.ok) throw new Error('News fetch failed')
    return await response.json()
  } catch (error) {
    console.error('[Homepage] News fetch error:', error)
    return { sections: {}, trending_keywords: [], stats: {} }
  }
}

export default async function HomePage() {
  const newsData = await getNews()

  return (
    <Suspense fallback={<NewsLoadingSkeleton />}>
      <NexusHomepage initialData={newsData} />
    </Suspense>
  )
}
