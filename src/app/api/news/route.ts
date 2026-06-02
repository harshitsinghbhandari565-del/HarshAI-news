// ============================================================
// NEXUS AI — Main News API Route
// Fetches, deduplicates, ranks, and returns news
// ============================================================

import { NextRequest, NextResponse } from 'next/server'
import {
  parseRSSFeed,
  deduplicateArticles,
  rankArticles,
  categorizeArticle,
  extractTags,
  isIndiaRelated,
  isModelRelated,
  type NewsArticle,
} from '@/lib/newsAggregator'
import { RSS_FEEDS } from '@/lib/newsFeeds'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 1800 // 30 minutes

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const section = searchParams.get('section') || 'all'
  const limit = parseInt(searchParams.get('limit') || '25')

  try {
    // Fetch from multiple sources in parallel
    const feedGroups = section === 'india'
      ? [RSS_FEEDS.india]
      : section === 'models'
      ? [RSS_FEEDS.models]
      : [RSS_FEEDS.global, RSS_FEEDS.india, RSS_FEEDS.models]

    const allFeeds = feedGroups.flat()

    // Parallel fetch with timeout protection
    const fetchPromises = allFeeds.map(feed =>
      parseRSSFeed(feed.url, feed.name).catch(() => [])
    )

    const results = await Promise.allSettled(fetchPromises)
    const rawArticles = results
      .filter(r => r.status === 'fulfilled')
      .flatMap(r => (r as PromiseFulfilledResult<any>).value)

    // Process pipeline
    const deduplicated = deduplicateArticles(rawArticles)
    const ranked = rankArticles(deduplicated)

    // Enrich with metadata
    const enriched = ranked.map(article => ({
      ...article,
      category: categorizeArticle(article),
      tags: extractTags(article),
      isIndiaRelated: isIndiaRelated(article),
      isModelRelated: isModelRelated(article),
    }))

    // Separate into sections
    const modelNews = enriched
      .filter(a => a.isModelRelated)
      .slice(0, 5)

    const indiaNews = enriched
      .filter(a => a.isIndiaRelated)
      .slice(0, 10)

    const globalNews = enriched
      .filter(a => !a.isIndiaRelated)
      .slice(0, 10)

    const trending = enriched
      .sort((a, b) => (b.trendScore || 0) - (a.trendScore || 0))
      .slice(0, 10)

    // Extract trending keywords
    const trendingKeywords = extractTrendingKeywords(enriched)

    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      stats: {
        total_fetched: rawArticles.length,
        after_dedup: deduplicated.length,
        sources_used: allFeeds.length,
      },
      sections: {
        top_models: modelNews,
        global_top10: globalNews,
        india_top10: indiaNews,
        trending,
      },
      trending_keywords: trendingKeywords,
      last_updated: new Date().toISOString(),
    }

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        'X-NEXUS-Source-Count': allFeeds.length.toString(),
        'X-NEXUS-Article-Count': enriched.length.toString(),
      },
    })
  } catch (error) {
    console.error('[News API Error]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news', sections: {} },
      { status: 500 }
    )
  }
}

function extractTrendingKeywords(articles: any[]): string[] {
  const keywordCount: Record<string, number> = {}
  const SKIP_WORDS = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'do', 'does', 'will', 'can', 'its', 'it', 'this', 'that', 'new', 'now', 'how', 'why', 'what'])

  for (const article of articles) {
    const words = (article.title || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/)
    for (const word of words) {
      if (word.length > 3 && !SKIP_WORDS.has(word)) {
        keywordCount[word] = (keywordCount[word] || 0) + 1
      }
    }
  }

  return Object.entries(keywordCount)
    .filter(([_, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word]) => word)
}

