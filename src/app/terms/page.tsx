export default function TermsPage() {
  return (
    <main style={{background:'#050508',minHeight:'100vh',color:'#e8e8ff',fontFamily:'Inter,sans-serif',margin:0,padding:0}}>

      {/* HEADER */}
      <header style={{background:'rgba(5,5,8,0.97)',borderBottom:'1px solid #1a1a35',padding:'14px 20px',display:'flex',alignItems:'center',gap:'12px',position:'sticky',top:0,zIndex:99}}>
        <div style={{width:36,height:36,borderRadius:9,background:'linear-gradient(135deg,#00d4ff,#7b2fff)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🧠</div>
        <div>
          <div style={{fontFamily:'sans-serif',fontWeight:800,fontSize:18,background:'linear-gradient(135deg,#00d4ff,#7b2fff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>HARSH AI</div>
          <div style={{fontSize:10,color:'#555588',letterSpacing:'0.1em'}}>REAL-TIME AI NEWS</div>
        </div>
        <a href="/" style={{marginLeft:'auto',padding:'7px 14px',borderRadius:8,border:'1px solid rgba(0,212,255,0.25)',color:'#00d4ff',fontSize:12,fontWeight:700,textDecoration:'none'}}>← Back to News</a>
      </header>

      {/* HERO */}
      <section style={{padding:'48px 20px 40px',background:'linear-gradient(160deg,rgba(0,212,255,0.05),rgba(123,47,255,0.07))',borderBottom:'1px solid #1a1a35',textAlign:'center'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(0,212,255,0.1)',border:'1px solid rgba(0,212,255,0.25)',borderRadius:100,padding:'5px 16px',marginBottom:16,fontSize:11,color:'#00d4ff',fontWeight:700,letterSpacing:'0.1em'}}>
          📜 LEGAL
        </div>
        <h1 style={{fontFamily:'sans-serif',fontWeight:800,fontSize:'clamp(1.8rem,4vw,2.8rem)',letterSpacing:'-0.04em',lineHeight:1.1,marginBottom:12}}>
          Terms of <span style={{background:'linear-gradient(135deg,#00d4ff,#7b2fff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Use</span>
        </h1>
        <p style={{color:'#9999cc',fontSize:14,maxWidth:480,margin:'0 auto'}}>
          Last updated: {new Date().toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'})}
        </p>
      </section>

      {/* CONTENT */}
      <div style={{maxWidth:760,margin:'0 auto',padding:'48px 20px 80px'}}>

        {/* Quick Summary Box */}
        <div style={{background:'rgba(0,212,255,0.06)',border:'1px solid rgba(0,212,255,0.2)',borderRadius:16,padding:'24px',marginBottom:40}}>
          <div style={{fontWeight:700,fontSize:16,marginBottom:12,display:'flex',alignItems:'center',gap:8}}>
            <span>⚡</span> Plain English Summary
          </div>
          <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:10}}>
            {[
              ['✅','We aggregate publicly available RSS feeds from news sources'],
              ['✅','We show only short snippets — never full articles'],
              ['✅','Every article links back to the original source'],
              ['✅','We credit every source by name'],
              ['✅','We collect no personal data without your consent'],
              ['✅','The service is free to use'],
            ].map(([icon, text]) => (
              <li key={text} style={{display:'flex',gap:10,alignItems:'flex-start',fontSize:14,color:'#9999cc'}}>
                <span style={{flexShrink:0}}>{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        {[
          {
            num:'01',
            title:'About HARSH AI',
            color:'#00d4ff',
            content:`HARSH AI is a free AI news aggregation platform that collects, organizes, and displays publicly available news headlines and summaries from across the internet. We cover global AI news and India-specific AI developments in real time.

HARSH AI is operated as a personal/startup project. Our platform is designed to help readers discover AI news faster — we do not create original journalism.`
          },
          {
            num:'02',
            title:'Content & Copyright',
            color:'#7b2fff',
            content:`All news content displayed on HARSH AI belongs to its respective original publishers and authors. HARSH AI aggregates content through:

• Publicly available RSS feeds provided by publishers
• Google News RSS aggregation (publicly accessible)
• Free news APIs with proper licensing

We display only:
• Article headlines (titles)
• Short snippets or summaries (2-3 sentences maximum)
• Source name and publication date
• A direct link to the full original article

We do NOT reproduce full articles, copy entire content, or claim ownership of any third-party content. All intellectual property rights remain with the original publishers.

If you are a content owner and wish to have your content removed, please contact us at legal@nexusai.news and we will remove it within 48 hours.`
          },
          {
            num:'03',
            title:'RSS Feeds & Fair Use',
            color:'#00ff88',
            content:`RSS (Really Simple Syndication) feeds are specifically designed and published by content creators to allow content distribution and aggregation. By publishing an RSS feed, content providers explicitly grant permission for their headlines and summaries to be displayed on aggregator platforms.

HARSH AI operates in the same manner as widely accepted aggregators including Google News, Apple News, Feedly, and Flipboard — all of which display RSS feed content legally and ethically.

Our aggregation:
• Drives traffic back to original publishers
• Never removes attribution or source credits  
• Respects robots.txt and crawl directives
• Does not scrape or bypass paywalls
• Does not store full article content`
          },
          {
            num:'04',
            title:'AI-Generated Summaries',
            color:'#ffd700',
            content:`HARSH AI uses artificial intelligence (powered by Groq and Google Gemini APIs) to generate short summaries of news articles. These summaries are:

• Created automatically from publicly available article snippets
• Intended for informational purposes only
• Not a substitute for reading the full original article
• Potentially imperfect — AI can make errors

We recommend always reading the full original article by clicking the source link. HARSH AI is not responsible for inaccuracies in AI-generated summaries.`
          },
          {
            num:'05',
            title:'User Conduct',
            color:'#ff9933',
            content:`By using HARSH AI, you agree to:

• Use the platform for lawful purposes only
• Not attempt to scrape, copy, or reproduce content in bulk
• Not attempt to hack, disrupt, or damage our systems
• Not misrepresent content from our platform as your own original work
• Respect the intellectual property of all content creators

We reserve the right to block access to users who violate these terms.`
          },
          {
            num:'06',
            title:'Privacy & Data',
            color:'#ff3366',
            content:`HARSH AI respects your privacy:

• We do NOT sell your personal data to anyone
• Newsletter email addresses are stored securely and used only to send the HARSH AI digest
• We use anonymous analytics (Vercel Analytics) to understand site traffic — no personal data is collected
• We use cookies only for essential site functionality
• You can unsubscribe from our newsletter at any time with one click

For full details, see our Privacy Policy.`
          },
          {
            num:'07',
            title:'Disclaimer',
            color:'#a855f7',
            content:`HARSH AI is provided "as is" without any warranties. We do not guarantee:

• The accuracy, completeness, or timeliness of any news content
• Uninterrupted availability of the service
• That AI-generated summaries are error-free

News content is the responsibility of the original publishers. HARSH AI is not liable for any decisions made based on content displayed on our platform.

The views expressed in aggregated articles belong to their original authors and do not represent the views of HARSH AI.`
          },
          {
            num:'08',
            title:'Changes to These Terms',
            color:'#00d4ff',
            content:`We may update these Terms of Use from time to time. When we do, we will update the "Last updated" date at the top of this page.

Continued use of HARSH AI after changes are posted constitutes your acceptance of the updated terms.`
          },
          {
            num:'09',
            title:'Contact Us',
            color:'#00ff88',
            content:`If you have any questions about these Terms of Use, or if you are a content owner with a removal request, please contact us:

📧 Email: legal@nexusai.news
🌐 Website: nexusai.news
🇮🇳 Based in India

We aim to respond to all inquiries within 48 hours.`
          },
        ].map(section => (
          <div key={section.num} style={{marginBottom:36}}>
            {/* Section Header */}
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
              <div style={{
                width:36,height:36,borderRadius:9,
                background:`${section.color}15`,
                border:`1px solid ${section.color}30`,
                display:'flex',alignItems:'center',justifyContent:'center',
                fontFamily:'monospace',fontWeight:800,fontSize:13,
                color:section.color,flexShrink:0
              }}>
                {section.num}
              </div>
              <h2 style={{
                fontFamily:'sans-serif',fontWeight:800,
                fontSize:'clamp(1.1rem,2.5vw,1.4rem)',
                letterSpacing:'-0.02em',color:'#e8e8ff'
              }}>
                {section.title}
              </h2>
            </div>

            {/* Section Content */}
            <div style={{
              background:'rgba(13,13,26,0.7)',
              border:`1px solid rgba(26,26,53,0.8)`,
              borderLeft:`3px solid ${section.color}`,
              borderRadius:'0 12px 12px 0',
              padding:'20px 24px',
            }}>
              {section.content.split('\n').map((line, i) => (
                line.trim() === '' ? <br key={i}/> :
                line.startsWith('•') ? (
                  <div key={i} style={{display:'flex',gap:8,alignItems:'flex-start',marginBottom:6}}>
                    <span style={{color:section.color,flexShrink:0,marginTop:2}}>•</span>
                    <span style={{fontSize:14,color:'#9999cc',lineHeight:1.65}}>{line.substring(1).trim()}</span>
                  </div>
                ) : (
                  <p key={i} style={{fontSize:14,color:'#9999cc',lineHeight:1.75,marginBottom:8}}>{line}</p>
                )
              ))}
            </div>
          </div>
        ))}

        {/* Bottom CTA */}
        <div style={{background:'linear-gradient(135deg,rgba(0,212,255,0.06),rgba(123,47,255,0.08))',border:'1px solid rgba(0,212,255,0.15)',borderRadius:16,padding:'28px',textAlign:'center',marginTop:48}}>
          <div style={{fontSize:28,marginBottom:12}}>🤝</div>
          <h3 style={{fontFamily:'sans-serif',fontWeight:800,fontSize:18,marginBottom:8}}>
            We Believe in Fair, Ethical Aggregation
          </h3>
          <p style={{color:'#9999cc',fontSize:14,lineHeight:1.7,maxWidth:480,margin:'0 auto 20px'}}>
            NEXUS AI exists to make AI knowledge more accessible. We respect content creators, always credit sources, and send readers back to the original publishers.
          </p>
          <a href="/" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'11px 22px',borderRadius:10,background:'linear-gradient(135deg,#00d4ff,#7b2fff)',color:'white',fontWeight:700,fontSize:14,textDecoration:'none'}}>
            🧠 Back to NEXUS AI News
          </a>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{padding:'24px 20px',borderTop:'1px solid #1a1a35',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}>
        <span style={{fontWeight:800,fontSize:16,background:'linear-gradient(135deg,#00d4ff,#7b2fff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>NEXUS AI</span>
        <div style={{display:'flex',gap:16,fontSize:12}}>
          <a href="/" style={{color:'#555588',textDecoration:'none'}}>Home</a>
          <a href="/terms" style={{color:'#00d4ff',textDecoration:'none'}}>Terms</a>
          <a href="/privacy" style={{color:'#555588',textDecoration:'none'}}>Privacy</a>
        </div>
        <span style={{fontSize:11,color:'#555588'}}>🇮🇳 Made in India · © {new Date().getFullYear()} NEXUS AI</span>
      </footer>

    </main>
  )
                    }
