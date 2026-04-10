export default function StepBoxColor({ box, color, setColor, aiRec, monthly, onNext, onBack }) {
  const pb = box?.price || 1.85
  const m = monthly

  const bg = color === 'white' ? '#f5f5f3' : '#c8924a'
  const sh = color === 'white' ? '#d0d0cc' : '#9b6b2a'
  const ink = '#1a1a1a'

  const miniSVG = `<svg viewBox="0 0 180 140" width="180" height="140" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mg1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${bg}"/><stop offset="100%" stop-color="${sh}"/></linearGradient>
      <linearGradient id="mg2" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="${sh}"/><stop offset="100%" stop-color="${bg}" stop-opacity=".88"/></linearGradient>
      <linearGradient id="mg3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${sh}" stop-opacity=".72"/><stop offset="100%" stop-color="${sh}"/></linearGradient>
    </defs>
    <polygon points="20,120 20,44 100,44 100,120" fill="url(#mg1)" stroke="${ink}" stroke-width="1"/>
    <polygon points="20,44 50,14 130,14 100,44" fill="url(#mg2)" stroke="${ink}" stroke-width="1"/>
    <polygon points="100,44 130,14 130,88 100,120" fill="url(#mg3)" stroke="${ink}" stroke-width="1"/>
  </svg>`

  return (
    <div>
      <p style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'var(--kraft-d)',textTransform:'uppercase',letterSpacing:2,marginBottom:8}}>Step 4 of 6 — Box &amp; Color</p>
      <h1 className="ptit">Confirm Your Box &amp; Color</h1>

      <div className="g2">
        <div>
          <div className="card">
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
              <h3 className="stit" style={{margin:0}}>{box?.name}</h3>
              <button className="btn btn-out" style={{fontSize:12,padding:'7px 12px'}} onClick={onBack}>Change box</button>
            </div>
            <div style={{marginBottom:14}} dangerouslySetInnerHTML={{__html:miniSVG}}/>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
              <span className="chip ck">{box?.dims}"</span>
              <span className={`chip ${box?.ect==='heavy'?'cy':'cg'}`}>{box?.ect==='heavy'?'Heavy Duty':'ECT-32'}</span>
              <span className="chip cgr">Max {box?.maxLbs} lbs</span>
            </div>
            <div className="g2">
              {[['Length',box?.l+'"'],['Width',box?.w+'"'],['Height',box?.h+'"'],['Price','$'+(box?.price||1.85).toFixed(2)+'/box']].map(([k,v])=>(
                <div key={k} style={{padding:12,background:'var(--paper)',borderRadius:'var(--rs)',border:'1px solid var(--bdr)'}}>
                  <div style={{fontSize:9.5,textTransform:'uppercase',letterSpacing:1,color:'#999',fontFamily:'DM Mono,monospace',marginBottom:2}}>{k}</div>
                  <div style={{fontSize:15,fontWeight:700,fontFamily:'DM Mono,monospace'}}>{v}</div>
                </div>
              ))}
            </div>
            {aiRec && (
              <div style={{marginTop:12}}>
                <label className="lbl">AI Confidence</label>
                <div style={{height:6,background:'var(--bdr)',borderRadius:3,overflow:'hidden',marginTop:4}}>
                  <div style={{height:'100%',background:'var(--acc)',borderRadius:3,width:`${aiRec.confidence}%`,transition:'width .5s ease'}}/>
                </div>
                <p style={{fontSize:12,color:'#666',marginTop:6}}>{aiRec.rationale}</p>
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="stit">Box Color</h3>
            <p className="psub" style={{marginBottom:12}}>Both options use black ink only.</p>
            <div style={{display:'flex',gap:10}}>
              {[
                {c:'kraft',swatch:'linear-gradient(135deg,#c8924a,#e0aa70)',t:'Kraft',d:'Natural brown corrugated. Rugged, earthy. Great for artisan, food, and industrial brands.'},
                {c:'white',swatch:'linear-gradient(135deg,#f5f5f3,#e8e8e5)',t:'White',d:'Clean white corrugated. Premium, bright. Great for beauty, health, tech, and food brands.'},
              ].map(o=>(
                <div key={o.c} onClick={()=>setColor(o.c)} style={{flex:1,border:`2px solid ${color===o.c?'var(--kraft)':'var(--bdr)'}`,borderRadius:'var(--rs)',padding:14,cursor:'pointer',transition:'all .2s',background:color===o.c?'var(--kraft-l)':'#fff'}}>
                  <div style={{width:40,height:40,borderRadius:'var(--rs)',margin:'0 auto 8px',background:o.swatch,border:'1px solid rgba(0,0,0,.1)'}}/>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:3,textAlign:'center'}}>{o.t}</div>
                  <div style={{fontSize:12,color:'#777',textAlign:'center'}}>{o.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div style={{background:'var(--ink)',color:'#fff',borderRadius:'var(--r)',padding:22}}>
            <h4 style={{fontFamily:'Playfair Display,serif',fontSize:18,color:'#fff',marginBottom:14}}>📦 Order Snapshot</h4>
            {[['Box',box?.name||''],['Dimensions',box?.dims+'"'],['Color',color.toUpperCase()],['Monthly Volume',m.toLocaleString()],['Monthly Cost','$'+(m*pb).toFixed(0)],['vs Packola','Save $'+(m*(2.40-pb)>0?(m*(2.40-pb)).toFixed(0):'0')+'/mo']].map(([l,v])=>(
              <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.08)'}}>
                <span style={{fontSize:11,color:'rgba(255,255,255,.5)',fontFamily:'DM Mono,monospace'}}>{l}</span>
                <span style={{fontSize:14,fontWeight:700,fontFamily:'DM Mono,monospace'}}>{v}</span>
              </div>
            ))}
            {m >= 5000 && (
              <a href="https://customboxes.io/quote" target="_blank" rel="noreferrer"
                className="btn btn-kraft" style={{width:'100%',justifyContent:'center',marginTop:14,textDecoration:'none',display:'flex'}}>
                🏭 Get Volume Quote
              </a>
            )}
          </div>
          <div className="card card-sm" style={{marginTop:14}}>
            <p style={{fontSize:13,color:'#666',lineHeight:1.7}}>Black-ink printing on corrugated is the most cost-effective professional packaging method. Min 1pt stroke, no gradients, vector artwork only.</p>
          </div>
          <div className="brow brow-b" style={{marginTop:14}}>
            <button className="btn btn-out" onClick={onBack}>← Back</button>
            <button className="btn btn-kraft btn-lg" onClick={onNext}>Generate Design →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
