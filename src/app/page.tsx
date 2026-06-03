export const dynamic = 'force-dynamic'

async function getNews() {
  try {
    const res = await fetch('https://harshai.vercel.app/api/news', {
      cache: 'no-store',
    })
    if (res.ok) return await res.json()
  } catch (e) {
    console.log('fetch error', e)
  }
  return { sections: {} }
}

export default async function HomePage() {
  const data: any = await getNews()
  const models = data?.sections?.top_models || []
  const global = data?.sections?.global_top10 || []
  const india  = data?.sections?.india_top10  || []

  return (
    <main style={{background:'#050508',minHeight:'100vh',color:'#e8e8ff',fontFamily:'Inter,sans-serif',margin:0,padding:0}}>

      {/* HEADER */}
      <header style={{background:'rgba(5,5,8,0.97)',borderBottom:'1px solid #1a1a35',padding:'14px 20px',display:'flex',alignItems:'center',gap:'12px',position:'sticky',top:0,zIndex:99}}>
        <div style={{width:36,height:36,borderRadius:9,background:'linear-gradient(135deg,#00d4ff,#7b2fff)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🚀</div>
        <div>
          <div style={{fontFamily:'sans-serif',fontWeight:800,fontSize:18,background:'linear-gradient(135deg,#00d4ff,#7b2fff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>HarshAI</div>
          <div style={{fontSize:10,color:'#555588',letterSpacing:'0.1em'}}>INDIA&apos;S AI INTELLIGENCE</div>
        </div>
        <a href="#india" style={{marginLeft:'auto',padding:'7px 14px',borderRadius:8,border:'1px solid rgba(255,153,51,0.3)',color:'#ff9933',fontSize:12,fontWeight:700,textDecoration:'none'}}>🇮🇳 India</a>
      </header>

      {/* HERO */}
      <section style={{padding:'50px 20px 60px',background:'linear-gradient(160deg,rgba(0,212,255,0.06),rgba(123,47,255,0.08))',borderBottom:'1px solid #1a1a35',textAlign:'center'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(255,51,102,0.1)',border:'1px solid rgba(255,51,102,0.25)',borderRadius:100,padding:'4px 14px',marginBottom:18,fontSize:11,color:'#ff3366',fontWeight:700,letterSpacing:'0.1em'}}>
          🔴 LIVE · AUTO-UPDATING
        </div>
        <h1 style={{fontFamily:'sans-serif',fontWeight:800,fontSize:'clamp(1.8rem,5vw,3.2rem)',letterSpacing:'-0.04em',lineHeight:1.1,marginBottom:14}}>
          India&apos;s AI News,<br/>
          <span style={{background:'linear-gradient(135deg,#00d4ff,#7b2fff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Intelligently Curated</span>
        </h1>
        <p style={{color:'#9999cc',fontSize:16,marginBottom:28,lineHeight:1.7,maxWidth:500,margin:'0 auto 28px'}}>
          Aggregated from <strong style={{color:'#e8e8ff'}}>50+ sources</strong> · AI-summarized · Global + India coverage
        </p>
        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="#models" style={{padding:'11px 20px',borderRadius:10,background:'linear-gradient(135deg,#00d4ff,#7b2fff)',color:'white',fontWeight:700,fontSize:14,textDecoration:'none'}}>🧠 AI Models</a>
          <a href="#global" style={{padding:'11px 20px',borderRadius:10,border:'1px solid rgba(123,47,255,0.3)',color:'#a855f7',fontWeight:700,fontSize:14,textDecoration:'none'}}>🌍 Global</a>
          <a href="#india" style={{padding:'11px 20px',borderRadius:10,border:'1px solid rgba(255,153,51,0.3)',color:'#ff9933',fontWeight:700,fontSize:14,textDecoration:'none'}}>🇮🇳 India</a>
        </div>
      </section>

      {/* AI MODELS */}
      <section id="models" style={{padding:'48px 20px',maxWidth:1200,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
          <div style={{width:28,height:28,borderRadius:7,background:'rgba(0,212,255,0.15)',border:'1px solid rgba(0,212,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>🧠</div>
          <span style={{fontSize:11,color:'#00d4ff',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase'}}>Section 01 · AI Models &amp; Agencies</span>
        </div>
        <h2 style={{fontFamily:'sans-serif',fontWeight:800,fontSize:'clamp(1.4rem,3vw,2rem)',letterSpacing:'-0.03em',marginBottom:28}}>
          Top 5 AI Model &amp; <span style={{background:'linear-gradient(135deg,#00d4ff,#7b2fff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Agency News</span>
        </h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
          {models.length > 0
            ? models.slice(0,5).map((a:any,i:number) => <Card key={i} a={a} rank={i+1} accent="#00d4ff"/>)
            : <Placeholders count={5} accent="#00d4ff" label="AI Model"/>}
        </div>
      </section>

      <hr style={{border:'none',height:1,background:'linear-gradient(90deg,transparent,#2a2a55,transparent)',margin:'0 20px'}}/>

      {/* GLOBAL */}
      <section id="global" style={{padding:'48px 20px',maxWidth:1200,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
          <div style={{width:28,height:28,borderRadius:7,background:'rgba(123,47,255,0.15)',border:'1px solid rgba(123,47,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>🌍</div>
          <span style={{fontSize:11,color:'#a855f7',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase'}}>Section 02 · Global AI Intelligence</span>
        </div>
        <h2 style={{fontFamily:'sans-serif',fontWeight:800,fontSize:'clamp(1.4rem,3vw,2rem)',letterSpacing:'-0.03em',marginBottom:28}}>
          Top 10 <span style={{background:'linear-gradient(135deg,#7b2fff,#00d4ff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Global AI Stories</span>
        </h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
          {global.length > 0
            ? global.slice(0,10).map((a:any,i:number) => <Card key={i} a={a} rank={i+1} accent="#7b2fff"/>)
            : <Placeholders count={6} accent="#7b2fff" label="Global AI"/>}
        </div>
      </section>

      <hr style={{border:'none',height:1,background:'linear-gradient(90deg,transparent,#2a2a55,transparent)',margin:'0 20px'}}/>

      {/* INDIA */}
      <section id="india" style={{padding:'48px 20px',maxWidth:1200,margin:'0 auto'}}>
        <div style={{height:3,background:'linear-gradient(90deg,#ff9933,white,#138808)',borderRadius:2,marginBottom:24,maxWidth:200}}/>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
          <div style={{width:28,height:28,borderRadius:7,background:'rgba(255,153,51,0.15)',border:'1px solid rgba(255,153,51,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>🇮🇳</div>
          <span style={{fontSize:11,color:'#ff9933',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase'}}>Section 03 · India AI Revolution</span>
        </div>
        <h2 style={{fontFamily:'sans-serif',fontWeight:800,fontSize:'clamp(1.4rem,3vw,2rem)',letterSpacing:'-0.03em',marginBottom:28}}>
          Top 10 India <span style={{background:'linear-gradient(135deg,#ff9933,#138808)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>AI Stories</span>
        </h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
          {india.length > 0
            ? india.slice(0,10).map((a:any,i:number) => <Card key={i} a={a} rank={i+1} accent="#ff9933"/>)
            : <Placeholders count={6} accent="#ff9933" label="India AI"/>}
        </div>
      </section>

      <hr style={{border:'none',height:1,background:'linear-gradient(90deg,transparent,#2a2a55,transparent)',margin:'0 20px'}}/>

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
        <span style={{fontWeight:800,fontSize:16,background:'linear-gradient(135deg,#00d4ff,#7b2fff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>HarshAI</span>
        <div style={{display:'flex',gap:16,fontSize:12}}>
          <a href="/terms" style={{color:'#555588',textDecoration:'none'}}>Terms of Use</a>
        </div>
        <span style={{fontSize:11,color:'#555588'}}>🇮🇳 Made in India · © 2025 HarshAI</span>
      </footer>

    </main>
  )
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
      style={{display:'block',textDecoration:'none',background:'rgba(13,13,26,0.9)',border:`1px solid rgba(26,26,53,0.8)`,borderRadius:14,overflow:'hidden'}}>
      <div style={{height:3,background:`linear-gradient(90deg,${accent},transparent)`,opacity:0.6}}/>
      <div style={{padding:16}}>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
          <span style={{fontFamily:'monospace',fontWeight:800,fontSize:16,color:accent,opacity:0.6}}>#{rank}</span>
          {a.isIndia && <span>🇮🇳</span>}
          {a.isModel && <span style={{fontSize:10,background:`${accent}15`,border:`1px solid ${accent}30`,borderRadius:100,padding:'1px 7px',color:accent,fontWeight:700}}>MODEL</span>}
        </div>
        <h3 style={{fontFamily:'sans-serif',fontWeight:700,fontSize:14,color:'#e8e8ff',lineHeight:1.4,marginBottom:8}}>{a.title}</h3>
        {a.summary && <p style={{fontSize:12,color:'#9999cc',lineHeight:1.6,marginBottom:10,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:3,WebkitBoxOrient:'vertical' as any}}>{a.summary.substring(0,180)}</p>}
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
  return (
    <>
      {Array.from({length:count}).map((_,i) => (
        <div key={i} style={{background:'rgba(13,13,26,0.7)',border:'1px solid #1a1a35',borderRadius:14,padding:16,minHeight:140}}>
          <div style={{fontSize:11,color:accent,marginBottom:10,fontFamily:'monospace',opacity:0.7}}>#{i+1} {label}</div>
          <div style={{height:14,background:'rgba(255,255,255,0.04)',borderRadius:4,marginBottom:8}}/>
          <div style={{height:11,background:'rgba(255,255,255,0.03)',borderRadius:4,width:'75%',marginBottom:6}}/>
          <div style={{height:11,background:'rgba(255,255,255,0.03)',borderRadius:4,width:'55%'}}/>
          <p style={{fontSize:11,color:'#555588',marginTop:12,fontFamily:'monospace'}}>Loading...</p>
        </div>
      ))}
    </>
  )
      }
