import { useState } from 'react'
import { setKey, discoverModels } from '../api.js'

export default function KeyGate({ onUnlock }) {
  const [val, setVal] = useState('')
  const [err, setErr] = useState('')

  function handleSubmit() {
    const k = val.trim()
    if (!k.startsWith('sk-or-')) {
      setErr('Must be an OpenRouter key starting with sk-or-...')
      return
    }
    setKey(k)
    discoverModels()
    onUnlock()
  }

  return (
    <div style={{minHeight:'100vh',background:'var(--paper)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24}}>
      {/* Logo */}
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:32}}>
        <div style={{width:44,height:44,background:'var(--ink)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{width:32,height:32,background:'var(--kraft)',borderRadius:5,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Playfair Display,serif',fontSize:16,fontWeight:700,color:'var(--ink)'}}>CB</div>
        </div>
        <div>
          <div style={{fontFamily:'Playfair Display,serif',fontSize:22,fontWeight:700,lineHeight:1}}>Custom<span style={{color:'var(--kraft)'}}>Boxes</span>.io</div>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'#999',letterSpacing:1,textTransform:'uppercase'}}>AI Packaging Designer</div>
        </div>
      </div>

      <div style={{background:'#fff',border:'1px solid var(--bdr)',borderRadius:'var(--r)',padding:36,boxShadow:'0 4px 32px var(--shd)',maxWidth:460,width:'100%'}}>
        <h2 style={{fontFamily:'Playfair Display,serif',fontSize:24,marginBottom:8}}>Enter Your API Key</h2>
        <p style={{fontSize:14,color:'#777',marginBottom:24,lineHeight:1.7}}>
          This app uses OpenRouter to power AI brand analysis and box recommendations.
          Paste your key below — it's stored only in your browser session and never saved anywhere.
        </p>

        <label className="lbl">OpenRouter API Key</label>
        <input
          className="inp"
          type="password"
          placeholder="sk-or-v1-..."
          value={val}
          onChange={e=>{ setVal(e.target.value); setErr('') }}
          onKeyDown={e=>e.key==='Enter'&&handleSubmit()}
          style={{marginBottom: err?8:16}}
          autoFocus
        />
        {err && <p style={{fontSize:12,color:'var(--red)',marginBottom:12}}>{err}</p>}

        <button className="btn btn-kraft btn-lg" style={{width:'100%'}} onClick={handleSubmit} disabled={val.length < 10}>
          Start Designing →
        </button>

        <div style={{marginTop:20,padding:14,background:'var(--paper)',borderRadius:'var(--rs)',fontSize:12.5,color:'#666',lineHeight:1.7}}>
          <strong style={{display:'block',marginBottom:4}}>🔑 How to get a free key:</strong>
          1. Go to <a href="https://openrouter.ai" target="_blank" rel="noreferrer">openrouter.ai</a><br/>
          2. Sign in with Google (free, no credit card)<br/>
          3. Click <strong>Keys → Create Key</strong><br/>
          4. Paste it above
        </div>

        <p style={{fontSize:11,color:'#bbb',textAlign:'center',marginTop:14}}>
          🔒 Your key is only stored in this browser session — never on any server.
        </p>
      </div>
    </div>
  )
}
