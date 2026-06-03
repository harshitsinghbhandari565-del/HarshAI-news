export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  let data: any = { sections: {} }
  
  try {
    const res = await fetch('https://harshai.vercel.app/api/news', { 
      cache: 'no-store'
    })
    if (res.ok) {
      data = await res.json()
    }
  } catch (e) {
    console.log('fetch error', e)
  }
    console.error('News fetch failed:', e)
  }
  return { sections: {} }
}

export default async function HomePage() {
  let data: any = await getNews()

  const models = data?.sections?.top_models || []
  const global = data?.sections?.global_top10 || []
  const india  = data?.sections?.india_top10  || []

  return (
    <main style={{background:'#050508',minHeight:'100vh',color:'#e8e8ff',fontFamily:'Inter,sans-serif',margin:0,padding:0}}>

      {/* HEADER */}
      <header style={{background:'rgba(5,5,8,0.97)',borderBottom:'1px solid #1a1a35',padding:'14px 20px',display:'flex',alignItems:'center',gap:'12px',position:'sticky',top:0,zIndex:99}}>
        <div style={{width:36,height:36,borderRadius:9,background:'linear-gradient(135deg,#00d4ff,#7b2fff)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🧠</div>
        <div>
          <div style={{fontFamily:'sans-serif',fontWeight:800,fontSize:18,background:'linear-gradient(135deg,#00d4ff,#7b2fff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>HARSH AI</div>
          <div style={{fontSize:10,color:'#555588',letterSpacing:'0.1em'}}>REAL-TIME AI NEWS</div>
        </div>
        <a href="#india" style={{marginLeft:'auto',padding:'7px 14px',borderRadius:8,border:'1px solid rgba(255,153,51,0.3)',color:'#ff9933',fontSize:12,fontWeight:700,textDecoration:'none'}}>🇮🇳 India</a>
      </header>

      {/* HERO */}
      <section style={{padding:'50px 20px 60px',background:'linear-gradient(160deg,rgba(0,212,255,0.06),rgba(123,47,255,0.08))',borderBottom:'1px solid #1a1a35',textAlign:'center'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(255,51,102,0.1)',border:'1px solid rgba(255,51,102,0.25)',borderRadius:100,padding:'4px 14px',marginBottom:18,fontSize:11,color:'#ff3366',fontWeight:700,letterSpacing:'0.1em'}}>
          🔴 LIVE · AUTO-UPDATING
        </div>
        <h1 style={{fontFamily:'sans-serif',fontWeight:800,fontSize:'clamp(1.8rem,5vw,3.2rem)',letterSpacing:'-0.04em',lineHeight:1.1,marginBottom:14}}>
          The World&apos;s AI News,<br/>
          <span style={{background:'linear-gradient(135deg,#00d4ff,#7b2fff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Intelligently Curated</span>
        </h1>
        <p style={{color:'#9999cc',fontSize:16,marginBottom:28,lineHeight:1.7,maxWidth:500,margin:'0 auto 28px'}}>
          Aggregated from <strong style={{color:'#e8e8ff'}}>50+ sources</strong> · AI-summarized · Global + India coverage
        </p>
        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="#models" style={{padding:'11px 20px',borderRadius:10,background:'linear-gradient(135deg,#00d4ff,#7b2fff)',color:'white',fontWeight:700,fontSize:14,textDecoration:'none'}}>🚀 AI Models</a>
          <a href="#global" style={{padding:'11px 20px',borderRadius:10,border:'1px solid rgba(123,47,255,0.3)',color:'#a855f7',fontWeight:700,fontSize:14,textDecoration:'none'}}>🌍 Global</a>
          <a href="#india" style={{padding:'11px 20px',borderRadius:10,border:'1px solid rgba(255,153,51,0.3)',color:'#ff9933',fontWeight:700,fontSize:14,textDecoration:'none'}}>🇮🇳 India</a>
        </div>
      </section>

      {/* AI MODELS */}
      <section id="models" style={{padding:'48px 20px',maxWidth:1200,margin:'0 auto'}}>
        <SectionHeader icon="🚀" label="Section 01 · AI Models & Agencies" color="#00d4ff"
          title={<>Top 5 AI Model & <Grad c1="#00d4ff" c2="#7b2fff">Agency News</Grad></>} />
        <Grid>
          {models.length > 0
            ? models.slice(0,5).map((a:any,i:number) => <Card key={i} a={a} rank={i+1} accent="#00d4ff"/>)
            : <Placeholders count={5} accent="#00d4ff" label="AI Model"/>}
        </Grid>
      </section>

      <Divider/>

      {/* GLOBAL */}
      <section id="global" style={{padding:'48px 20px',maxWidth:1200,margin:'0 auto'}}>
        <SectionHeader icon="🌍" label="Section 02 · Global AI Intelligence" color="#a855f7"
          title={<>Top 10 <Grad c1="#7b2fff" c2="#00d4ff">Global AI Stories</Grad></>} />
        <Grid>
          {global.length > 0
            ? global.slice(0,10).map((a:any,i:number) => <Card key={i} a={a} rank={i+1} accent="#7b2fff"/>)
            : <Placeholders count={6} accent="#7b2fff" label="Global AI"/>}
        </Grid>
      </section>

      <Divider/>

      {/* INDIA */}
      <section id="india" style={{padding:'48px 20px',maxWidth:1200,margin:'0 auto'}}>
        <div style={{height:3,background:'linear-gradient(90deg,#ff9933,white,#138808)',borderRadius:2,marginBottom:24,maxWidth:200}}/>
        <SectionHeader icon="🇮🇳" label="Section 03 · India AI Revolution" color="#ff9933"
          title={<>Top 10 India <Grad c1="#ff9933" c2="#138808">AI Stories</Grad></>} />
        <Grid>
          {india.length > 0
            ? india.slice(0,10).map((a:any,i:number) => <Card key={i} a={a} rank={i+1} accent="#ff9933"/>)
            : <Placeholders count={6} accent="#ff9933" label="India AI"/>}
        </Grid>
      </section>

      <Divider/>

      {/* NEWSLETTER */}
      <section id="newsletter" style={{padding:'56px 20px',background:'linear-gradient(135deg,rgba(0,212,255,0.05),rgba(123,47,255,0.07))',borderTop:'1px solid #1a1a35',textAlign:'center'}}>
        <div style={{maxWidth:480,margin:'0 auto'}}>
          <div style={{fontSize:40,marginBottom:16}}>📧</div>
          <h2 style={{fontFamily:'sans-serif',fontWeight:800,fontSize:'clamp(1.5rem,4vw,2.2rem)',letterSpacing:'-0.03em',marginBottom:12}}>
            Never Miss a <span style={{background:'linear-gradient(135deg,#00d4ff,#7b2fff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Breakthrough</span>
          </h2>
          <p style={{color:'#9999cc',fontSize:15,marginBottom:24,lineHeight:1.7}}>Daily AI digest · Top 10 stories · India focus · Free forever</p>
          <form style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center'}}>
            <input type="email" placeholder="your@email.com" style={{flex:1,minWidth:200,padding:'12px 16px',borderRadius:10,background:'rgba(13,13,26,0.9)',border:'1px solid #2a2a55',color:'#e8e8ff',fontSize:14,outline:'none'}}/>
            <button type="submit" style={{padding:'12px 22px',borderRadius:10,background:'linear-gradient(135deg,#00d4ff,#7b2fff)',color:'white',fontWeight:700,fontSize:14,border:'none',cursor:'pointer'}}>⚡ Subscribe</button>
          </form>
          <p style={{fontSize:11,color:'#555588',marginTop:14}}>🔒 No spam · Free · Unsubscribe anytime</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:'24px 20px',borderTop:'1px solid #1a1a35',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10}}>
        <span style={{fontWeight:800,fontSize:16,background:'linear-gradient(135deg,#00d4ff,#7b2fff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>HARSH AI</span>
        <span style={{fontSize:11,color:'#555588'}}>🇮🇳 Made in India · 🌍 For the World HARSH AI </span>
        <a href="/terms" style={{color:'#555588',textDecoration:'none',fontSize:11}}>Terms of Use</a>
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          <div style={{width:6,height:6,borderRadius:'50%',background:'#00ff88'}}/>
          <span style={{fontSize:11,color:'#00ff88'}}>Live</span>
        </div>
      </footer>
    </main>
  )
}

function Grad({c1,c2,children}:{c1:string,c2:string,children:React.ReactNode}) {
  return <span style={{background:`linear-gradient(135deg,${c1},${c2})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{children}</span>
}

function SectionHeader({icon,label,color,title}:{icon:string,label:string,color:string,title:React.ReactNode}) {
  return (
    <div style={{marginBottom:28}}>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
        <div style={{width:28,height:28,borderRadius:7,background:`${color}20`,border:`1px solid ${color}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>{icon}</div>
        <span style={{fontSize:11,color,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase'}}>{label}</span>
      </div>
      <h2 style={{fontFamily:'sans-serif',fontWeight:800,fontSize:'clamp(1.3rem,3vw,1.9rem)',letterSpacing:'-0.03em'}}>{title}</h2>
    </div>
  )
}

function Grid({children}:{children:React.ReactNode}) {
  return <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>{children}</div>
}

function Divider() {
  return <hr style={{border:'none',height:1,background:'linear-gradient(90deg,transparent,#2a2a55,transparent)',margin:'0 20px'}}/>
}

function Card({a,rank,accent}:{a:any,rank:number,accent:string}) {
  const ago = (d:string) => {
    if(!d) return ''
    const s = Math.floor((Date.now()-new Date(d).getTime())/1000)
    if(s<3600) return `${Math.floor(s/60)}m ago`
    if(s<86400) return `${Math.floor(s/3600)}h ago`
    return `${Math.floor(s/86400)}d ago`
  }
  return (
    <a href={a.url} target="_blank" rel="noopener noreferrer"
      style={{display:'block',textDecoration:'none',background:'rgba(13,13,26,0.9)',border:`1px solid rgba(26,26,53,0.8)`,borderRadius:14,overflow:'hidden',transition:'all 0.3s'}}>
      <div style={{height:3,background:`linear-gradient(90deg,${accent},transparent)`,opacity:0.6}}/>
      <div style={{padding:16}}>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
          <span style={{fontFamily:'monospace',fontWeight:800,fontSize:16,color:accent,opacity:0.6}}>#{rank}</span>
          {a.isIndia && <span>🇮🇳</span>}
          {a.isModel && <span style={{fontSize:10,background:`${accent}15`,border:`1px solid ${accent}30`,borderRadius:100,padding:'1px 7px',color:accent,fontWeight:700}}>MODEL</span>}
        </div>
        <h3 style={{fontFamily:'sans-serif',fontWeight:700,fontSize:14,color:'#e8e8ff',lineHeight:1.4,marginBottom:8}}>{a.title}</h3>
        {a.summary && <p style={{fontSize:12,color:'#9999cc',lineHeight:1.6,marginBottom:10,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:3,WebkitBoxOrient:'vertical'as any}}>{a.summary?.substring(0,180)}</p>}
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          <span style={{fontSize:11,color:accent,fontWeight:700,fontFamily:'monospace'}}>{a.sourceName}</span>
          <span style={{color:'#555588'}}>·</span>
          <span style={{fontSize:11,color:'#555588',fontFamily:'monospace'}}>{ago(a.publishedAt)}</span>
        </div>
      </div>
    </a>
  )
}

function Placeholders({count,accent,label}:{count:number,accent:string,label:string}) {
  return <>
    {Array.from({length:count}).map((_,i) => (
      <div key={i} style={{background:'rgba(13,13,26,0.7)',border:'1px solid #1a1a35',borderRadius:14,padding:16,minHeight:140}}>
        <div style={{fontSize:11,color:accent,marginBottom:10,fontFamily:'monospace',opacity:0.7}}>#{i+1} {label}</div>
        <div style={{height:14,background:'rgba(255,255,255,0.04)',borderRadius:4,marginBottom:8}}/>
        <div style={{height:11,background:'rgba(255,255,255,0.03)',borderRadius:4,width:'75%',marginBottom:6}}/>
        <div style={{height:11,background:'rgba(255,255,255,0.03)',borderRadius:4,width:'55%'}}/>
        <p style={{fontSize:11,color:'#555588',marginTop:12,fontFamily:'monospace'}}>Fetching from RSS feeds...</p>
      </div>
    ))}
  </>
      }
