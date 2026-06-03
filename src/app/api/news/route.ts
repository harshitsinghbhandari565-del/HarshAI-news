import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

const FEEDS = [
  { url: 'https://feeds.feedburner.com/TechCrunch/startups', name: 'TechCrunch' },
  { url: 'https://venturebeat.com/category/ai/feed/', name: 'VentureBeat AI' },
  { url: 'https://www.artificialintelligence-news.com/feed/', name: 'AI News' },
  { url: 'https://news.google.com/rss/search?q=artificial+intelligence&hl=en-US&gl=US&ceid=US:en', name: 'Google News AI' },
  { url: 'https://news.google.com/rss/search?q=GPT+Claude+Gemini+Llama+AI+model&hl=en-US&gl=US&ceid=US:en', name: 'AI Models' },
  { url: 'https://news.google.com/rss/search?q=OpenAI+Anthropic+DeepMind&hl=en-US&gl=US&ceid=US:en', name: 'AI Companies' },
  { url: 'https://news.google.com/rss/search?q=AI+India+artificial+intelligence+2025&hl=en-IN&gl=IN&ceid=IN:en', name: 'India AI News' },
  { url: 'https://news.google.com/rss/search?q=AI+startup+India+technology&hl=en-IN&gl=IN&ceid=IN:en', name: 'India AI Startups' },
  { url: 'https://news.google.com/rss/search?q=Krutrim+Sarvam+AI+India&hl=en-IN&gl=IN&ceid=IN:en', name: 'India AI Companies' },
  { url: 'https://analyticsindiamag.com/feed/', name: 'Analytics India' },
]

function extractText(xml: string, tag: string): string {
  const patterns = [
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'),
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'),
  ]
  for (const p of patterns) {
    const m = xml.match(p)
    if (m?.[1]) return m[1].replace(/<[^>]+>/g, '').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ').replace(/&#\d+;/g,'').trim()
  }
  return ''
}

function hashId(str: string): string {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0
  }
  return Math.abs(h).toString(36)
}

async function fetchFeed(feedUrl: string, feedName: string) {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(feedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; HarshAI-Bot/1.0; +https://harshai.vercel.app)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    })
    clearTimeout(timer)
    if (!res.ok) return []
    const xml = await res.text()
    const items = xml.match(/<item[\s\S]*?<\/item>/gi) || []
    const articles = []
    for (const item of items.slice(0, 12)) {
      const title = extractText(item, 'title')
      const link  = extractText(item, 'link') || extractText(item, 'guid')
      const desc  = extractText(item, 'description') || extractText(item, 'summary') || ''
      const pub   = extractText(item, 'pubDate') || extractText(item, 'published') || ''
      if (!title || title.length < 10) continue
      if (!link || !link.startsWith('http')) continue
      const txt = (title + ' ' + desc).toLowerCase()
      const isIndia = ['india','indian','bangalore','bengaluru','mumbai','delhi','hyderabad','pune','chennai','iit','nasscom','krutrim','sarvam','infosys','tcs','wipro','reliance','flipkart','niti'].some(k => txt.includes(k))
      const isModel = ['gpt','claude','gemini','llama','grok','mistral','openai','anthropic','deepmind','meta ai','copilot','dall-e','sora','stable diffusion','midjourney','perplexity'].some(k => txt.includes(k))
      let publishedAt = new Date().toISOString()
      try { if (pub) publishedAt = new Date(pub).toISOString() } catch {}
      articles.push({
        id: hashId(link),
        title,
        url: link,
        sourceName: feedName,
        summary: desc.substring(0, 300),
        publishedAt,
        isIndia,
        isModel,
        trendScore: Math.random() * 0.5,
      })
    }
    return articles
  } catch {
    return []
  }
}

export async function GET() {
  try {
    const results = await Promise.allSettled(
      FEEDS.map(f => fetchFeed(f.url, f.name))
    )
    const all: any[] = results.flatMap(r =>
      r.status === 'fulfilled' ? r.value : []
    )

    // Deduplicate by URL
    const seen = new Set<string>()
    const unique = all.filter(a => {
      if (!a?.url || seen.has(a.url)) return false
      seen.add(a.url)
      return true
    })

    // Sort by date newest first
    const sorted = unique.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    const models   = sorted.filter(a => a.isModel).slice(0, 5)
    const india    = sorted.filter(a => a.isIndia).slice(0, 10)
    const global   = sorted.filter(a => !a.isIndia && !a.isModel).slice(0, 10)

    // If sections are empty, put everything in global
    const fallbackGlobal = sorted.slice(0, 10)

    return NextResponse.json({
      success: true,
      total: sorted.length,
      timestamp: new Date().toISOString(),
      sections: {
        top_models:   models.length   > 0 ? models  : sorted.slice(0, 5),
        global_top10: global.length   > 0 ? global  : fallbackGlobal,
        india_top10:  india.length    > 0 ? india   : sorted.slice(0, 10),
      }
    })
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: String(err),
      sections: { top_models: [], global_top10: [], india_top10: [] }
    }, { status: 500 })
  }
                 }
