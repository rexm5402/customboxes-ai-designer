import { render3D, render2D } from '../svgUtils.js'

export default function StepOutput({ state, onEdit }) {
  const { box, color, brand, design, logo, lscale = 60, panels, monthly = 750 } = state
  const pb = box?.price || 1.85
  const m = monthly

  const mockupSVG = render3D({ box, color, brand, design, logo, lscale, panels })

  function dlSVG() {
    const svg = render2D({ box, color, brand, design, logo, lscale, panels })
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = (brand?.companyName||'packaging').replace(/\s+/g,'-').toLowerCase()+'-dieline.svg'
    a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div style={{textAlign:'center',marginBottom:32}}>
        <div style={{fontSize:48,marginBottom:10}}>🎉</div>
        <h1 className="ptit">{brand?.companyName||'Your Brand'} — Design Complete</h1>
        <p className="psub" style={{maxWidth:560,margin:'0 auto'}}>
          {box?.name} ({box?.dims}") · {color.toUpperCase()} Corrugated · Black Ink · Production-Ready
        </p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
        <div>
          <div className="card">
            <h3 className="stit" style={{marginBottom:14}}>Final Mockup</h3>
            <div dangerouslySetInnerHTML={{__html: mockupSVG}}/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,margin:'14px 0'}}>
              {[['Box',box?.name||'—'],['Size',box?.dims+'"'],['Color',color.toUpperCase()],['Board',box?.ect==='heavy'?'ECT-HD':'ECT-32'],['Ink','BLACK'],['$/box','$'+pb.toFixed(2)]].map(([k,v])=>(
                <div key={k} style={{padding:12,background:'var(--paper)',border:'1px solid var(--bdr)',borderRadius:'var(--rs)'}}>
                  <div style={{fontSize:9.5,fontFamily:'DM Mono,monospace',textTransform:'uppercase',letterSpacing:1,color:'#888',marginBottom:3}}>{k}</div>
                  <div style={{fontSize:15,fontWeight:700,fontFamily:'DM Mono,monospace'}}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="stit" style={{marginBottom:12}}>Actions</h3>
            {[
              {ico:'⬇',l:'Download SVG Dieline',d:'Production-ready flat file for your print shop',fn:dlSVG},
              {ico:'🖨',l:'Print / Save PDF',d:'Use browser print dialog',fn:()=>window.print()},
              {ico:'✏️',l:'Continue Editing',d:'Refine with quick actions & panel controls',fn:onEdit},
              {ico:'🏭',l:'Order at CustomBoxes.io',d:'Upload design, confirm specs, place order',fn:()=>window.open('https://customboxes.io','_blank')},
            ].map(a=>(
              <div key={a.l} onClick={a.fn} style={{display:'flex',alignItems:'center',gap:12,padding:'14px 16px',border:'1.5px solid var(--bdr)',borderRadius:'var(--rs)',cursor:'pointer',transition:'all .2s',background:'#fff',marginBottom:9}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--kraft)';e.currentTarget.style.background='var(--kraft-l)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--bdr)';e.currentTarget.style.background='#fff'}}>
                <div style={{fontSize:22,flexShrink:0,width:40,textAlign:'center'}}>{a.ico}</div>
                <div>
                  <strong style={{display:'block',fontSize:14,fontWeight:600}}>{a.l}</strong>
                  <span style={{fontSize:12,color:'#888'}}>{a.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{background:'var(--ink)',color:'#fff',borderRadius:'var(--r)',padding:22}}>
            <h4 style={{fontFamily:'Playfair Display,serif',fontSize:18,color:'#fff',marginBottom:14}}>📊 ROI Summary</h4>
            {[
              ['Monthly Boxes', m.toLocaleString()],
              ['Monthly Investment', '$'+(m*pb).toFixed(0)],
              ['vs Packola Savings', '$'+(m*(2.40-pb)).toFixed(0)+'/mo'],
              ['Revenue Uplift', '+22%', true],
              ['Break-Even', '~2 months', true],
              ['Annual Savings vs Packola', '$'+(m*(2.40-pb)*12).toFixed(0), true],
            ].map(([l,v,g])=>(
              <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.08)'}}>
                <span style={{fontSize:11,color:'rgba(255,255,255,.5)',fontFamily:'DM Mono,monospace'}}>{l}</span>
                <span style={{fontSize:14,fontWeight:700,fontFamily:'DM Mono,monospace',color:g?'#6ee7b7':'#fff'}}>{v}</span>
              </div>
            ))}
            {m >= 5000 && (
              <a href="https://customboxes.io/quote" target="_blank" rel="noreferrer"
                className="btn btn-kraft" style={{width:'100%',justifyContent:'center',marginTop:14,textDecoration:'none',display:'flex'}}>
                🏭 Get Volume Quote ({m.toLocaleString()}/mo)
              </a>
            )}
          </div>

          <div className="card card-sm" style={{marginTop:14}}>
            <h3 className="stit" style={{fontSize:18,marginBottom:10}}>Next Steps</h3>
            <ol style={{paddingLeft:18,fontSize:13.5,color:'#555',lineHeight:2}}>
              <li>Download your SVG dieline</li>
              <li>Review print specs (1pt min, no gradients)</li>
              <li>Upload artwork at CustomBoxes.io</li>
              <li>Confirm dimensions &amp; quantity</li>
              <li>Place order — ships in ~10 business days</li>
            </ol>
            <a href="https://customboxes.io" target="_blank" rel="noreferrer"
              className="btn btn-grn btn-lg" style={{width:'100%',justifyContent:'center',marginTop:14,textDecoration:'none',display:'flex'}}>
              🏭 Order at CustomBoxes.io →
            </a>
          </div>

          <div style={{background:'var(--ylw-l)',border:'1px solid var(--ylw)',borderRadius:'var(--rs)',padding:'12px 14px',fontSize:12.5,color:'#92400e',lineHeight:1.6,marginTop:14}}>
            ⚠️ You are responsible for verifying box dimensions fit your product before ordering.{' '}
            <a href="https://customboxes.io/return-policy" target="_blank" rel="noreferrer">Return Policy</a>
          </div>
        </div>
      </div>
    </div>
  )
}
