import { useState, useEffect } from 'react'
import { render3D, render2D } from '../svgUtils.js'

const ACTIONS = {
  'Make logo larger':    { fn:(s)=>({...s,lscale:Math.min((s.lscale||60)+20,100)}), msg:'**Logo scaled up.** Use the scale slider to fine-tune.' },
  'Make logo smaller':   { fn:(s)=>({...s,lscale:Math.max((s.lscale||60)-20,25)}),  msg:'**Logo scaled down.**' },
  'Premium feel':        { fn:(s)=>({...s,design:{...s.design,border:'double-line'},panels:{front:true,side:true,top:true,back:false}}), msg:'**Premium feel applied** — double border, logo on front/sides/top.' },
  'Simplify layout':     { fn:(s)=>({...s,design:{...s.design,border:'thin-line'},panels:{front:true,side:false,top:false,back:false}}), msg:'**Layout simplified** — thin border, logo front only.' },
  'Make it playful':     { fn:(s)=>({...s,design:{...s.design,border:'corner-marks'},panels:{front:true,side:true,top:false,back:true}}), msg:'**Playful style** — corner marks, logo on front/sides/back.' },
  'No border':           { fn:(s)=>({...s,design:{...s.design,border:'none'}}), msg:'**Border removed** — clean, minimal.' },
  'Double border':       { fn:(s)=>({...s,design:{...s.design,border:'double-line'}}), msg:'**Double border applied** — classic premium look.' },
  'Corner marks':        { fn:(s)=>({...s,design:{...s.design,border:'corner-marks'}}), msg:'**Corner marks applied** — graphic, editorial feel.' },
  'Logo on all sides':   { fn:(s)=>({...s,panels:{front:true,side:true,top:true,back:true}}), msg:'**Logo on all 4 sides** — maximum brand visibility.' },
  'Logo front only':     { fn:(s)=>({...s,panels:{front:true,side:false,top:false,back:false}}), msg:'**Logo front only** — minimal, clean.' },
  'Flip logo to back':   { fn:(s)=>({...s,panels:{front:false,side:false,top:false,back:true}}), msg:'**Logo moved to back panel** — surprise unboxing moment.' },
  'ROI analysis':        { fn:(s)=>s, msg:'**ROI:** CustomBoxes.io $1.85/box · Packola $2.40 · UPS $3.10 · Plain $0.85\n**Branded uplift:** +22% revenue · +15–30% repeat purchase · ~2 month break-even.' },
  'Print specs':         { fn:(s)=>s, msg:'**Print Production Specs:**\n• Min stroke: 1pt\n• No gradients or halftones\n• Vector logo (EPS/SVG/AI)\n• Safe margin: 0.25" all sides\n• Resolution: 300dpi\n• Ink: Black only (1-color job)\n• Board: ECT-32 or Heavy Duty' },
  'Comp pricing':        { fn:(s)=>s, msg:'**Competitor Pricing per box:**\n• CustomBoxes.io: $1.85 ✓\n• Packola: $2.40 (+30%)\n• UPS Supply: $3.10 (+68%)\n• Plain brown: $0.85 (no branding)' },
}

const QP_SECTIONS = [
  { label:'✏️ Design Feel',  items:['Premium feel','Simplify layout','Make it playful','No border','Double border','Corner marks'] },
  { label:'🖼 Logo Controls', items:['Make logo larger','Make logo smaller','Logo on all sides','Logo front only','Flip logo to back'] },
  { label:'📊 Info & Specs', items:['ROI analysis','Print specs','Comp pricing'], info:true },
]

export default function StepDesign({ state, setState, onNext, onBack }) {
  const [pvMode, setPvMode] = useState('3d')
  const [chat, setChat] = useState([])
  const { box, color, brand, design, logo, lscale = 60, panels = { front:true,side:true,top:false,back:false } } = state

  useEffect(() => {
    setChat([{ role:'bot', text:`**${brand?.companyName||'Your brand'}** design loaded — **${box?.name}** (${box?.dims}") in **${color} corrugated, black ink**.\n\nClick the quick actions below to instantly edit your design:` }])
  }, [])

  function addMsg(role, text) {
    setChat(c => [...c, { role, text }])
  }

  function applyAction(label) {
    const act = ACTIONS[label]
    if (!act) return
    addMsg('usr', label)
    const next = act.fn(state)
    setState(next)
    setTimeout(() => addMsg('bot', act.msg), 150)
  }

  function dlSVG() {
    const svg = render2D({ box, color, brand, design, logo, lscale, panels })
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = (brand?.companyName||'packaging').replace(/\s+/g,'-').toLowerCase()+'-dieline.svg'
    a.click(); URL.revokeObjectURL(url)
  }

  const svgContent = pvMode === '3d'
    ? render3D({ box, color, brand, design, logo, lscale, panels })
    : render2D({ box, color, brand, design, logo, lscale, panels })

  return (
    <div>
      <p style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'var(--kraft-d)',textTransform:'uppercase',letterSpacing:2,marginBottom:8}}>Step 5 of 6 — Design Studio</p>
      <h1 className="ptit">Design Studio</h1>

      <div style={{display:'grid',gridTemplateColumns:'1fr 400px',gap:20,alignItems:'start'}}>
        {/* LEFT: PREVIEW */}
        <div>
          {/* View tabs */}
          <div style={{display:'flex',gap:6,marginBottom:14}}>
            {[['3d','3D Mockup'],['2d','2D Dieline']].map(([m,l])=>(
              <button key={m} onClick={()=>setPvMode(m)} style={{padding:'7px 14px',borderRadius:6,fontSize:12,fontWeight:600,cursor:'pointer',border:`1.5px solid ${pvMode===m?'var(--ink)':'var(--bdr)'}`,background:pvMode===m?'var(--ink)':'#fff',color:pvMode===m?'#fff':'#888',fontFamily:'DM Mono,monospace',transition:'all .2s'}}>
                {l}
              </button>
            ))}
          </div>

          {/* SVG Preview */}
          <div style={{border:'1px solid var(--bdr)',borderRadius:'var(--rs)',overflow:'hidden',background:'var(--paper-d)',minHeight:300}}>
            <div dangerouslySetInnerHTML={{__html: svgContent}}/>
          </div>

          {/* Box info chips */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:'14px 0 10px'}}>
            <span style={{fontSize:13,fontWeight:600}}>Box &amp; Color</span>
            <div style={{display:'flex',gap:6}}>
              <span className="chip ck">{box?.name}</span>
              <span className="chip cgr">{color.toUpperCase()} / BLACK INK</span>
            </div>
          </div>

          {/* Panel Logo Toggles */}
          <label className="lbl">Logo Panels</label>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
            {['front','side','top','back'].map(p=>(
              <div key={p} onClick={()=>setState({...state,panels:{...panels,[p]:!panels[p]}})}
                style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 12px',border:`1.5px solid ${panels[p]?'var(--grn)':'var(--bdr)'}`,borderRadius:'var(--rs)',cursor:'pointer',fontSize:13,fontWeight:500,background:panels[p]?'var(--grn-l)':'#fff',transition:'all .2s',userSelect:'none'}}>
                {p.charAt(0).toUpperCase()+p.slice(1)}
                <div style={{width:32,height:18,borderRadius:9,background:panels[p]?'var(--grn)':'var(--bdr)',position:'relative',transition:'all .2s',flexShrink:0}}>
                  <div style={{position:'absolute',width:12,height:12,background:'#fff',borderRadius:'50%',top:3,left:panels[p]?17:3,transition:'all .2s',boxShadow:'0 1px 3px rgba(0,0,0,.2)'}}/>
                </div>
              </div>
            ))}
          </div>

          {/* Logo Scale */}
          {logo && (
            <div style={{marginBottom:12}}>
              <label className="lbl">Logo Scale — {lscale}%</label>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:12,color:'#888'}}>25%</span>
                <input type="range" min={25} max={100} value={lscale}
                  onChange={e=>setState({...state,lscale:+e.target.value})}
                  style={{flex:1,accentColor:'var(--kraft)',height:5,cursor:'pointer'}}/>
                <span style={{fontSize:12,color:'#888'}}>100%</span>
              </div>
            </div>
          )}

          {/* Panel Breakdown */}
          <label className="lbl" style={{marginTop:12}}>Panel Breakdown</label>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:4}}>
            {[['FRONT ★',design?.front?.primary||design?.front],['SIDE',design?.side?.primary||design?.side],['TOP',design?.top?.primary||design?.top],['BACK',design?.back?.primary||design?.back],['BOTTOM',design?.bottom?.primary||design?.bottom],['PRINT',design?.printNotes]].map(([n,v])=>(
              <div key={n} style={{padding:'11px 13px',border:'1px solid var(--bdr)',borderRadius:'var(--rs)',background:'var(--paper)'}}>
                <div style={{fontSize:9.5,fontFamily:'DM Mono,monospace',textTransform:'uppercase',letterSpacing:1,color:'var(--kraft-d)',marginBottom:3,fontWeight:600}}>{n}</div>
                <div style={{fontSize:12.5,color:'#444',lineHeight:1.5}}>{typeof v==='object'?v?.primary||'—':v||'—'}</div>
              </div>
            ))}
          </div>

          {/* Print Notes */}
          <div style={{background:'var(--paper-d)',border:'1px solid var(--bdr)',borderRadius:'var(--rs)',padding:13,fontSize:12.5,color:'#555',lineHeight:1.7,marginTop:12}}>
            <strong>Design Philosophy:</strong> {design?.philosophy||'Clean, restrained, production-aware.'}<br/>
            <strong>Print Notes:</strong> {design?.printNotes||'All strokes min 1pt. No gradients. Vector logo. 0.25" margins. Black ink only.'}
          </div>

          <div className="brow brow-b" style={{marginTop:18}}>
            <div className="brow">
              <button className="btn btn-out" onClick={dlSVG}>⬇ Download SVG</button>
              <button className="btn btn-out" onClick={()=>window.print()}>🖨 Print / PDF</button>
            </div>
            <button className="btn btn-kraft btn-lg" onClick={onNext}>View Final Output →</button>
          </div>
        </div>

        {/* RIGHT: CHAT AGENT */}
        <div>
          <div style={{background:'var(--paper)',border:'1.5px solid var(--bdr)',borderRadius:'var(--r)',display:'flex',flexDirection:'column',height:560}}>
            {/* Header */}
            <div style={{padding:'14px 16px',borderBottom:'1px solid var(--bdr)',display:'flex',alignItems:'center',gap:8,background:'#fff',borderRadius:'var(--r) var(--r) 0 0'}}>
              <span style={{fontSize:16}}>🤖</span>
              <div>
                <div style={{fontSize:14,fontWeight:600}}>AI Design Agent</div>
                <div style={{fontSize:11,color:'#888'}}>Design edits · ROI · Print specs · Instant actions</div>
              </div>
            </div>

            {/* Messages */}
            <div style={{flex:1,overflowY:'auto',padding:14,display:'flex',flexDirection:'column',gap:10}}>
              {chat.map((m,i)=>(
                <div key={i} style={{display:'flex',justifyContent:m.role==='usr'?'flex-end':'flex-start'}}>
                  <div style={{maxWidth:'82%',padding:'10px 14px',borderRadius:m.role==='bot'?'4px 12px 12px 12px':'12px 4px 12px 12px',fontSize:13,lineHeight:1.6,background:m.role==='bot'?'#fff':'var(--ink)',color:m.role==='bot'?'var(--ink)':'#fff',border:m.role==='bot'?'1px solid var(--bdr)':'none'}}>
                    {m.text.split('\n').filter(Boolean).map((l,j)=>(
                      <p key={j} style={{marginBottom:4}} dangerouslySetInnerHTML={{__html:l.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}}/>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{padding:10,borderTop:'1px solid var(--bdr)',background:'#fff',borderRadius:'0 0 var(--r) var(--r)'}}>
              <div style={{display:'flex',gap:8}}>
                <input style={{flex:1,padding:'9px 13px',border:'1.5px solid var(--bdr)',borderRadius:'var(--rs)',fontFamily:'DM Sans,sans-serif',fontSize:13,outline:'none',background:'var(--paper)',opacity:.5,cursor:'default'}} placeholder="Use the quick actions below ↓" readOnly/>
                <button className="btn btn-ink" style={{opacity:.3,cursor:'not-allowed'}} disabled>Send</button>
              </div>
              {/* Quick prompts by section */}
              <div style={{marginTop:8}}>
                {QP_SECTIONS.map(sec=>(
                  <div key={sec.label} style={{marginBottom:8}}>
                    <div style={{fontSize:9.5,fontFamily:'DM Mono,monospace',textTransform:'uppercase',letterSpacing:1,color:'#aaa',marginBottom:5}}>{sec.label}</div>
                    <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                      {sec.items.map(q=>(
                        <button key={q} onClick={()=>applyAction(q)} style={{padding:'5px 11px',border:`1.5px solid ${sec.info?'var(--acc-l)':'var(--bdr)'}`,borderRadius:100,fontSize:11.5,cursor:'pointer',background:sec.info?'var(--acc-l)':'#fff',color:sec.info?'var(--acc)':'#444',transition:'all .18s',fontWeight:500,whiteSpace:'nowrap'}}>
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
