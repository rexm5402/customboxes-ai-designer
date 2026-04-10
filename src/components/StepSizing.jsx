import { useState } from 'react'
import { BOXES, ALL_BOXES, QA_STEPS } from '../data.js'

export default function StepSizing({ onNext, onBack, aiRecId, aiRec }) {
  const [path, setPath] = useState(null) // 'known' | 'unknown'
  const [boxGroup, setBoxGroup] = useState('std')
  const [selectedId, setSelectedId] = useState(aiRecId || null)
  const [qaStep, setQaStep] = useState(0)
  const [qaAnswers, setQaAnswers] = useState({})

  function selectBox(id) {
    setSelectedId(id)
  }

  function confirmBox() {
    const box = ALL_BOXES.find(b => b.id === selectedId)
    if (!box) return
    onNext(box)
  }

  function answerQA(id, val) {
    const next = { ...qaAnswers, [id]: val }
    setQaAnswers(next)
    if (qaStep < QA_STEPS.length - 1) {
      setTimeout(() => setQaStep(s => s + 1), 280)
    } else {
      setTimeout(() => onNext(null, next), 280)
    }
  }

  return (
    <div>
      <p style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'var(--kraft-d)',textTransform:'uppercase',letterSpacing:2,marginBottom:8}}>Step 3 of 6 — Box Sizing</p>
      <h1 className="ptit">Find Your Perfect Box</h1>
      <p className="psub">Do you already know your box size, or should we help you find it?</p>

      {!path && (
        <div className="g2" style={{maxWidth:560,marginBottom:28}}>
          {[
            {p:'known',ico:'📦',t:'I know my size',d:'Browse our catalog and select directly'},
            {p:'unknown',ico:'🤔',t:'Help me find a size',d:'Answer 6 quick questions for an AI recommendation'},
          ].map(o=>(
            <div key={o.p} onClick={()=>setPath(o.p)} style={{border:'2px solid var(--bdr)',borderRadius:'var(--r)',padding:22,cursor:'pointer',textAlign:'center',transition:'all .2s',background:'#fff'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--kraft)';e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--bdr)';e.currentTarget.style.transform='none'}}>
              <div style={{fontSize:36,marginBottom:8}}>{o.ico}</div>
              <div style={{fontWeight:700,fontSize:16,marginBottom:5}}>{o.t}</div>
              <div style={{fontSize:12.5,color:'#777'}}>{o.d}</div>
            </div>
          ))}
        </div>
      )}

      {/* KNOWN PATH */}
      {path === 'known' && (
        <div>
          <div style={{display:'flex',gap:0,border:'1.5px solid var(--bdr)',borderRadius:'var(--rs)',overflow:'hidden',marginBottom:18,background:'var(--paper-d)',width:'fit-content'}}>
            {[['std','Standard (5)'],['pop','Popular Custom (5)'],['any','Any Size (3)']].map(([g,l])=>(
              <button key={g} onClick={()=>setBoxGroup(g)} style={{padding:'9px 18px',fontSize:13,fontWeight:boxGroup===g?600:500,cursor:'pointer',background:boxGroup===g?'#fff':'transparent',border:'none',color:boxGroup===g?'var(--ink)':'#888',transition:'all .2s'}}>
                {l}
              </button>
            ))}
          </div>

          <div className="g3" style={{marginBottom:16}}>
            {BOXES[boxGroup].map(b=>(
              <div key={b.id} onClick={()=>selectBox(b.id)} style={{
                border:`2px solid ${selectedId===b.id?'var(--kraft)':b.id===aiRecId?'var(--acc)':'var(--bdr)'}`,
                borderRadius:'var(--r)',padding:16,cursor:'pointer',transition:'all .2s',
                background:selectedId===b.id?'var(--kraft-l)':'#fff',position:'relative',
              }}>
                {b.id===aiRecId && <div style={{position:'absolute',top:10,right:10,fontSize:10,fontFamily:'DM Mono,monospace',padding:'3px 8px',borderRadius:100,background:'var(--acc-l)',color:'var(--acc)'}}>AI Pick</div>}
                <div style={{fontFamily:'Playfair Display,serif',fontSize:16,fontWeight:700,marginBottom:4}}>{b.name}</div>
                <div style={{fontFamily:'DM Mono,monospace',fontSize:13,color:'var(--kraft-d)',marginBottom:6}}>{b.dims}"</div>
                <div style={{fontSize:12,color:'#777',lineHeight:1.5,marginBottom:8}}>{b.desc}</div>
                <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                  <span className="chip cgr">Max {b.maxLbs} lbs</span>
                  <span className={`chip ${b.ect==='heavy'?'cy':'cg'}`}>${b.price.toFixed(2)}/box</span>
                  {b.ect==='heavy' && <span className="chip cy">Heavy Duty</span>}
                </div>
              </div>
            ))}
          </div>

          <div style={{background:'var(--ylw-l)',border:'1px solid var(--ylw)',borderRadius:'var(--rs)',padding:'12px 14px',fontSize:12.5,color:'#92400e',lineHeight:1.6,marginBottom:16}}>
            ⚠️ <strong>Important:</strong> You are responsible for verifying dimensions fit your product before ordering.{' '}
            <a href="https://customboxes.io/return-policy" target="_blank" rel="noreferrer">View return policy →</a>
          </div>

          <div className="brow brow-b">
            <button className="btn btn-out" onClick={()=>setPath(null)}>← Back</button>
            <button className="btn btn-kraft btn-lg" disabled={!selectedId} onClick={confirmBox}>Confirm Box →</button>
          </div>
        </div>
      )}

      {/* Q&A PATH */}
      {path === 'unknown' && (
        <div style={{maxWidth:680,margin:'0 auto'}}>
          <div style={{height:3,background:'var(--bdr)',borderRadius:2,marginBottom:18,overflow:'hidden'}}>
            <div style={{height:'100%',background:'var(--kraft)',borderRadius:2,transition:'width .4s ease',width:`${(qaStep/QA_STEPS.length)*100}%`}}/>
          </div>
          <div className="card">
            <p style={{fontSize:11,fontFamily:'DM Mono,monospace',color:'#aaa',marginBottom:8}}>Question {qaStep+1} of {QA_STEPS.length}</p>
            <h2 style={{fontFamily:'Playfair Display,serif',fontSize:20,marginBottom:6}}>{QA_STEPS[qaStep].q}</h2>
            <p style={{fontSize:13,color:'#888',marginBottom:16}}>{QA_STEPS[qaStep].hint}</p>
            <div style={{display:'flex',flexDirection:'column',gap:9}}>
              {QA_STEPS[qaStep].opts.map(o=>(
                <button key={o.v} onClick={()=>answerQA(QA_STEPS[qaStep].id, o.v)}
                  style={{padding:'12px 16px',border:`1.5px solid ${qaAnswers[QA_STEPS[qaStep].id]===o.v?'var(--kraft)':'var(--bdr)'}`,borderRadius:'var(--rs)',cursor:'pointer',fontSize:14,transition:'all .2s',textAlign:'left',background:qaAnswers[QA_STEPS[qaStep].id]===o.v?'var(--kraft-l)':'#fff',display:'flex',alignItems:'center',gap:10}}>
                  <span style={{fontSize:18,flexShrink:0}}>{o.icon}</span>{o.l}
                </button>
              ))}
            </div>
            {qaStep > 0 && (
              <div style={{marginTop:14}}>
                <button className="btn btn-out" onClick={()=>setQaStep(s=>s-1)}>← Back</button>
              </div>
            )}
          </div>
        </div>
      )}

      {!path && (
        <div className="brow" style={{marginTop:8}}>
          <button className="btn btn-out" onClick={onBack}>← Back to Brand</button>
        </div>
      )}
    </div>
  )
}
