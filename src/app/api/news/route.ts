import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const FEEDS = [
  { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', name: 'TechCrunch AI' },
  { url: 'https://venturebeat.com/category/ai/feed/', name: 'VentureBeat AI' },
  { url: 'https://www.artificialintelligence-news.com/feed/', name: 'AI News' },
  { url: 'https://feeds.arstechnica.com/arstechnica/technology-lab', name: 'Ars Technica' },
  { url: 'https://news.google.com/rss/search?q=artificial+intelligence&hl=en-US&gl=US&ceid=US:en', name: 'Google News AI' },
  { url: 'https://news.google.com/rss/search?q=GPT+Claude+Gemini+AI+model&hl=en', name: 'AI Models News' },
  { url: 'https://openai.com/blog/rss.xml', name: 'OpenAI Blog' },
  { url: 'https://huggingface.co/blog/feed.xml', name: 'HuggingFace' },
  { url: 'https://www.deepmind.com/blog/rss.xml', name: 'DeepMind' },
  { url: 'https://news.google.com/rss/search?q=AI+India+artificial+intelligence&hl=en-IN&gl=IN&ceid=IN:en', name: 'Google News India AI' },
  { url: 'https://analyticsindiamag.com/feed/', name: 'Analytics India Mag' },
  { url: 'https://inc42.com/feed/', name: 'Inc42' },
]

async function parseFeed(url: string, name: string) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'HARSH-AI-Bot/1.0' },
      signal: AbortSignal.timeout(6000),
    })
    if (!res.ok) return []
    const xml = await res.text()
    const items = xml.match(/<item[\s\S]*?<\/item>/gi) || []
    return items.slice(0, 15).map(item => {
      const get = (tag: string) => {
        const m = item.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'))
          || item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
        return m ? m[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').trim() : ''
      }
      const title = get('title')
      const link  = get('link') || get('guid')
      const desc  = get('description') || get('summary') || ''
      const pub   = get('pubDate') || get('published') || ''
      if (!title || !link) return null
      const txt = `${title} ${desc}`.toLowerCase()
      const isIndia = ['india','indian','bangalore','bengaluru','mumbai','delhi','hyderabad','iit','nasscom','krutrim','sarvam','infosys','tcs','wipro','reliance'].some(k => txt.includes(k))
      const isModel = ['gpt','claude','gemini','llama','grok','mistral','openai','anthropic','deepmind','meta ai','copilot'].some(k => txt.includes(k))
      return {
        id: Math.abs(link.split('').reduce((h,c) => (h<<5)-h+c.charCodeAt(0), 0)).toString(36),
        title, url: link, sourceName: name,
        summary: desc.substring(0, 250),
        publishedAt: pub ? new Date(pub).toISOString() : new Date().toISOString(),
        isIndia, isModel,
      }
    }).filter(Boolean)
  } catch { return [] }
}

export async function GET() {
  const results = await Promise.allSettled(FEEDS.map(f => parseFeed(f.url, f.name)))
  const all = results.flatMap(r => r.status === 'fulfilled' ? r.value : []) as any[]
  const seen = new Set<string>()
  const deduped = all.filter(a => { if (!a?.url || seen.has(a.url)) return false; seen.add(a.url); return true })
  const sorted = [...deduped].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    sections: {
      top_models:   sorted.filter(a => a.isModel).slice(0, 5),
      global_top10: sorted.filter(a => !a.isIndia).slice(0, 10),
      india_top10:  sorted.filter(a => a.isIndia).slice(0, 10),
    }
  })
      }
