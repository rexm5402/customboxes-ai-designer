import { useState } from 'react'

export default function StepBrand({ brand, url, onNext, onBack }) {
  const [monthly, setMonthly] = useState(750)
  const b = brand

  const pb = 1.85
  const m = monthly
  const uplift = m * pb * 0.22

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 310px',gap:20,alignItems:'start'}}>
      <div>
        <p style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'var(--kraft-d)',textTransform:'uppercase',letterSpacing:2,marginBottom:8}}>Step 2 of 6 — Brand Intelligence</p>
        <h1 className="ptit">{b.companyName}</h1>
        <p style={{color:'#777',fontSize:13,marginBottom:0}}>{url}</p>
        {b.summaryQuote && (
          <div style={{background:'var(--paper)',borderLeft:'3px solid var(--kraft)',padding:14,borderRadius:'0 8px 8px 0',fontSize:14,color:'#555',fontStyle:'italic',margin:'12px 0 0',lineHeight:1.7}}>
            "{b.summaryQuote}"
          </div>
        )}

        <div className="card" style={{marginTop:16}}>
          <div className="g4" style={{marginBottom:14}}>
            {[['Tone & Vibe',b.tone],['Target Customer',b.targetCustomer],['Visual Style',b.typography],['Positioning',b.positioning],['Color Palette',(b.colorPalette||[]).join(', ')],['Design Direction',b.designDirection],['Industry',b.industry],['Packaging',b.packagingStyle]].map(([k,v])=>(
              <div key={k} style={{padding:12,background:'var(--paper)',borderRadius:'var(--rs)',border:'1px solid var(--bdr)'}}>
                <div style={{fontSize:9.5,textTransform:'uppercase',letterSpacing:1,color:'#999',fontFamily:'DM Mono,monospace',marginBottom:2}}>{k}</div>
                <div style={{fontSize:13.5,fontWeight:600,lineHeight:1.4}}>{v||'—'}</div>
              </div>
            ))}
          </div>
          <hr style={{border:'none',borderTop:'1px solid var(--bdr)',marginBottom:14}}/>
          <div className="g2">
            <div>
              <label className="lbl">Trust Signals</label>
              <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                {(b.trustSignals||[]).map(s=><span key={s} className="chip ck">{s}</span>)}
              </div>
            </div>
            <div>
              <label className="lbl">Packaging Direction</label>
              <p style={{fontSize:13.5,color:'#444',lineHeight:1.7}}>{b.packagingStyle}</p>
              <div style={{marginTop:8}}>
                <span className={`chip ${b.colorRec==='white'?'cb':'ck'}`}>
                  → {b.colorRec==='white'?'White':'Kraft'} Box Recommended
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="stit">Additional Brand Context</h3>
          <div className="g2">
            <div>
              <label className="lbl">Monthly boxes shipped</label>
              <select className="inp" value={monthly} onChange={e=>setMonthly(+e.target.value)}>
                <option value={50}>Less than 100/month</option>
                <option value={250}>100–500/month</option>
                <option value={750}>500–1,000/month</option>
                <option value={2500}>1,000–5,000/month</option>
                <option value={7500}>5,000+/month (volume)</option>
              </select>
            </div>
            <div>
              <label className="lbl">Primary customer segment</label>
              <select className="inp">
                <option>Direct-to-consumer (DTC)</option>
                <option>Wholesale / B2B</option>
                <option>Subscription box</option>
                <option>Retail / brick and mortar</option>
                <option>E-commerce marketplace</option>
              </select>
            </div>
          </div>
        </div>

        <div className="brow brow-b">
          <button className="btn btn-out" onClick={onBack}>← Back</button>
          <button className="btn btn-kraft btn-lg" onClick={()=>onNext(monthly)}>Continue to Box Sizing →</button>
        </div>
      </div>

      {/* ROI Sidebar */}
      <div>
        <div style={{background:'var(--ink)',color:'#fff',borderRadius:'var(--r)',padding:22}}>
          <h4 style={{fontFamily:'Playfair Display,serif',fontSize:18,color:'#fff',marginBottom:14}}>💰 ROI Analysis</h4>
          {[
            ['Monthly Boxes', m.toLocaleString()],
            ['CustomBoxes.io $/box', `$${pb.toFixed(2)}`],
            ['Monthly Investment', `$${(m*pb).toFixed(0)}`],
            ['vs Plain Box Cost', `+$${(m*(pb-0.85)).toFixed(0)}/mo`],
            ['Revenue Uplift (+22%)', `+$${uplift.toFixed(0)}/mo`, true],
            ['Break-Even', `~${Math.ceil((m*(pb-0.85))/uplift*30)} days`, true],
          ].map(([l,v,g])=>(
            <div key={l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.08)'}}>
              <span style={{fontSize:11,color:'rgba(255,255,255,.5)',fontFamily:'DM Mono,monospace'}}>{l}</span>
              <span style={{fontSize:14,fontWeight:700,fontFamily:'DM Mono,monospace',color:g?'#6ee7b7':'#fff'}}>{v}</span>
            </div>
          ))}
          <table style={{width:'100%',borderCollapse:'collapse',marginTop:14,fontSize:12}}>
            <thead><tr>{['Supplier','$/box','Mo. Cost','vs CB'].map(h=><th key={h} style={{textAlign:'left',padding:'5px 7px',color:'rgba(255,255,255,.4)',fontFamily:'DM Mono,monospace',fontSize:9,textTransform:'uppercase',borderBottom:'1px solid rgba(255,255,255,.1)'}}>{h}</th>)}</tr></thead>
            <tbody>
              {[{n:'CustomBoxes.io ★',p:pb,hl:true},{n:'Packola',p:2.40},{n:'UPS Supply',p:3.10},{n:'Plain Brown',p:0.85}].map(r=>(
                <tr key={r.n}>
                  <td style={{padding:'7px',color:r.hl?'#6ee7b7':'rgba(255,255,255,.8)',fontWeight:r.hl?700:400,borderBottom:'1px solid rgba(255,255,255,.06)'}}>{r.n}</td>
                  <td style={{padding:'7px',color:r.hl?'#6ee7b7':'rgba(255,255,255,.8)',borderBottom:'1px solid rgba(255,255,255,.06)'}}>${r.p.toFixed(2)}</td>
                  <td style={{padding:'7px',color:r.hl?'#6ee7b7':'rgba(255,255,255,.8)',borderBottom:'1px solid rgba(255,255,255,.06)'}}>${(m*r.p).toFixed(0)}</td>
                  <td style={{padding:'7px',color:r.hl?'#6ee7b7':'rgba(255,255,255,.8)',borderBottom:'1px solid rgba(255,255,255,.06)'}}>{r.hl?'—':`$${(m*(r.p-pb)).toFixed(0)}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{background:'rgba(200,146,74,.15)',border:'1px solid rgba(200,146,74,.3)',borderRadius:7,padding:11,marginTop:12,fontSize:12,color:'rgba(255,255,255,.7)',lineHeight:1.65}}>
            Branded packaging drives 22% avg revenue uplift and 15–30% higher repeat purchases.
          </div>
        </div>
        {monthly >= 5000 && (
          <a href="https://customboxes.io/quote" target="_blank" rel="noreferrer"
            className="btn btn-kraft" style={{width:'100%',justifyContent:'center',marginTop:12,textDecoration:'none',display:'flex'}}>
            🏭 Get Volume Quote ({monthly.toLocaleString()}/mo)
          </a>
        )}
      </div>
    </div>
  )
}
