import { useState } from 'react'

export default function StepURL({ onNext }) {
  const [url, setUrl] = useState('')
  const [logo, setLogo] = useState(null)
  const [ref, setRef] = useState(null)

  function handleFile(e, setter, labelId) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setter(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div style={{maxWidth:600,margin:'0 auto',paddingTop:24}}>
      <p style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'var(--kraft-d)',textTransform:'uppercase',letterSpacing:2,marginBottom:10}}>Step 1 of 6</p>
      <h1 className="ptit">AI Packaging Designer</h1>
      <p className="psub">Enter your company website and we'll analyze your brand, recommend the perfect shipping box, and generate a production-ready black-ink packaging design — in minutes.</p>

      <div className="card">
        <label className="lbl">Company Website URL</label>
        <div style={{display:'flex',gap:10,marginBottom:14}}>
          <input className="inp" type="url" placeholder="https://yourcompany.com" value={url} onChange={e=>setUrl(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&url.length>5&&onNext(url,logo,ref)}/>
          <button className="btn btn-kraft" disabled={url.length<6} onClick={()=>onNext(url,logo,ref)}>Analyze →</button>
        </div>

        <div className="g2" style={{marginBottom:14}}>
          <div>
            <label className="lbl">Upload Logo (optional)</label>
            <div className={`upz${logo?' on':''}`} onClick={()=>document.getElementById('logoF').click()}>
              <input id="logoF" type="file" accept="image/*" style={{display:'none'}} onChange={e=>handleFile(e,setLogo)}/>
              {logo ? <img src={logo} style={{maxHeight:50,maxWidth:160,objectFit:'contain',margin:'0 auto',display:'block'}}/> : <span>📎 Click to upload logo</span>}
            </div>
          </div>
          <div>
            <label className="lbl">Design Reference (optional)</label>
            <div className={`upz${ref?' on':''}`} onClick={()=>document.getElementById('refF').click()}>
              <input id="refF" type="file" accept="image/*" style={{display:'none'}} onChange={e=>handleFile(e,setRef)}/>
              {ref ? <img src={ref} style={{maxHeight:50,maxWidth:160,objectFit:'contain',margin:'0 auto',display:'block'}}/> : <span>🎨 Upload brand reference</span>}
            </div>
          </div>
        </div>

        <button className="btn btn-ink btn-lg" style={{width:'100%'}} disabled={url.length<6} onClick={()=>onNext(url,logo,ref)}>
          🔍 Analyze Brand &amp; Start
        </button>
      </div>

      <div style={{display:'flex',gap:14,flexWrap:'wrap',marginTop:18}}>
        {[
          {ico:'🏭',t:'Production-Ready',d:'Black-ink corrugated designs'},
          {ico:'📦',t:'13 Box Options',d:'Standard, custom, any size'},
          {ico:'📈',t:'ROI Analysis',d:'Break-even & comp shop included'},
        ].map(c=>(
          <div key={c.t} className="card card-sm" style={{flex:1,minWidth:160,borderLeft:`3px solid var(--kraft)`}}>
            <div style={{fontSize:20,marginBottom:5}}>{c.ico}</div>
            <div style={{fontSize:13,fontWeight:600,marginBottom:3}}>{c.t}</div>
            <div style={{fontSize:12,color:'#777'}}>{c.d}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
