import { useState } from 'react'
import './index.css'
import { askJSON, getKey, clearKey, discoverModels } from './api.js'
import { ALL_BOXES, mockBrand, mockDesign, mockBoxRec } from './data.js'
import Header from './components/Header.jsx'
import KeyGate from './components/KeyGate.jsx'
import Loading from './components/Loading.jsx'
import StepURL from './components/StepURL.jsx'
import StepBrand from './components/StepBrand.jsx'
import StepSizing from './components/StepSizing.jsx'
import StepBoxColor from './components/StepBoxColor.jsx'
import StepDesign from './components/StepDesign.jsx'
import StepOutput from './components/StepOutput.jsx'

export default function App() {
  const [unlocked, setUnlocked] = useState(!!getKey())
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadTxt, setLoadTxt] = useState('Processing…')
  const [error, setError] = useState(null)

  const [appState, setAppState] = useState({
    url: '', logo: null, ref: null,
    brand: null, monthly: 750,
    box: null, color: 'kraft',
    aiRec: null, aiRecId: null,
    design: null,
    panels: { front:true, side:true, top:false, back:false },
    lscale: 60,
  })

  function patchState(patch) {
    setAppState(s => ({ ...s, ...patch }))
  }

  function handleInvalidKey() {
    clearKey()
    setUnlocked(false)
    setError('API key is invalid or expired. Please enter a new key.')
  }

  // ── STEP 0 → 1 ──────────────────────────────────────────────────────────
  async function handleURL(url, logo, ref) {
    patchState({ url, logo, ref })
    setLoading(true)
    setLoadTxt('Analyzing brand from ' + url.replace(/https?:\/\//,'').split('/')[0] + '…')
    discoverModels()
    try {
      const sys = `You are a brand analyst and packaging expert for CustomBoxes.io. Analyze the given company URL and extract packaging-relevant brand signals. Return ONLY valid JSON with no markdown.`
      const user = `Company URL: ${url}\n\nReturn JSON exactly: {"companyName":"","tagline":"","tone":"","targetCustomer":"","colorPalette":["",""],"typography":"","positioning":"","packagingStyle":"","designDirection":"","trustSignals":[""],"colorRec":"kraft","colorRationale":"","summaryQuote":"","industry":""}`
      const brand = await askJSON(sys, user)
      patchState({ brand, color: brand.colorRec || 'kraft' })
      setStep(1)
    } catch (e) {
      if (e.message === 'INVALID_KEY') { handleInvalidKey(); return }
      setError(e.message)
    }
    setLoading(false)
  }

  // ── STEP 1 → 2 ──────────────────────────────────────────────────────────
  function handleBrandNext(monthly) {
    patchState({ monthly })
    setStep(2)
  }

  // ── STEP 2 → 3 ──────────────────────────────────────────────────────────
  async function handleSizingNext(box, qaAnswers) {
    if (box) {
      patchState({ box }); setStep(3); return
    }
    setLoading(true)
    setLoadTxt('Finding your perfect box…')
    try {
      const sys = 'You are a packaging expert. Recommend the single best box from this catalog. Return ONLY valid JSON, no markdown.'
      const catalog = ALL_BOXES.map(b => `${b.id}: ${b.name} (${b.dims}", ECT-${b.ect==='heavy'?'HD':'32'}, max ${b.maxLbs}lbs, $${b.price}/box) — ${b.desc}`).join('\n')
      const user = `Brand: ${appState.brand?.companyName}, Industry: ${appState.brand?.industry}\nAnswers: ${JSON.stringify(qaAnswers)}\nCatalog:\n${catalog}\nReturn: {"boxId":"","boxName":"","confidence":85,"rationale":"","colorRec":"kraft","colorRationale":""}`
      const rec = await askJSON(sys, user)
      const selectedBox = ALL_BOXES.find(b => b.id === rec.boxId) || ALL_BOXES[2]
      patchState({ box: selectedBox, aiRec: rec, aiRecId: rec.boxId, color: rec.colorRec || appState.color })
      setStep(3)
    } catch (e) {
      if (e.message === 'INVALID_KEY') { handleInvalidKey(); return }
      setError(e.message)
    }
    setLoading(false)
  }

  // ── STEP 3 → 4 ──────────────────────────────────────────────────────────
  async function handleGenerateDesign() {
    setLoading(true)
    setLoadTxt('Generating packaging design…')
    try {
      const sys = `You are a packaging designer specializing in black-ink corrugated shipping boxes. Generate a production-aware layout. Return ONLY valid JSON, no markdown.`
      const user = `Brand: ${JSON.stringify(appState.brand)}\nBox: ${appState.box?.name} (${appState.box?.dims}") ${appState.color} corrugated, BLACK INK ONLY\nReturn: {"front":{"primary":"","secondary":"","tertiary":""},"side":{"primary":"","secondary":""},"top":{"primary":"","secondary":""},"back":{"primary":"","secondary":""},"bottom":{"primary":""},"border":"thin-line","logoStyle":"centered","philosophy":"","printNotes":"","tagline":""}`
      const design = await askJSON(sys, user)
      patchState({ design })
      setStep(4)
    } catch (e) {
      if (e.message === 'INVALID_KEY') { handleInvalidKey(); return }
      setError(e.message)
    }
    setLoading(false)
  }

  // Show key gate if not unlocked
  if (!unlocked) return <KeyGate onUnlock={()=>setUnlocked(true)}/>

  return (
    <>
      <Loading show={loading} text={loadTxt}/>

      {error && (
        <div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:'#1a1a1a',color:'#fff',padding:'14px 20px',borderRadius:10,zIndex:9999,fontFamily:'DM Sans,sans-serif',fontSize:14,maxWidth:480,width:'90%',boxShadow:'0 8px 32px rgba(0,0,0,.3)',borderLeft:'3px solid var(--red)',display:'flex',alignItems:'center',gap:14}}>
          <span style={{fontSize:18}}>⚠️</span>
          <div style={{flex:1}}>
            <strong style={{display:'block',marginBottom:2}}>Error</strong>
            <span style={{fontSize:12,opacity:.8}}>{error}</span>
          </div>
          <button onClick={()=>setError(null)} style={{background:'rgba(255,255,255,.1)',border:'none',color:'#fff',width:28,height:28,borderRadius:'50%',cursor:'pointer',fontSize:16,flexShrink:0}}>×</button>
        </div>
      )}

      <Header step={step} onChangeKey={()=>{ clearKey(); setUnlocked(false); setStep(0); setAppState({url:'',logo:null,ref:null,brand:null,monthly:750,box:null,color:'kraft',aiRec:null,aiRecId:null,design:null,panels:{front:true,side:true,top:false,back:false},lscale:60}) }}/>

      <main style={{maxWidth:1300,margin:'0 auto',padding:'32px 24px 100px'}}>
        {step === 0 && <StepURL onNext={handleURL}/>}
        {step === 1 && <StepBrand brand={appState.brand} url={appState.url} onNext={handleBrandNext} onBack={()=>setStep(0)}/>}
        {step === 2 && <StepSizing onNext={handleSizingNext} onBack={()=>setStep(1)} aiRecId={appState.aiRecId} aiRec={appState.aiRec}/>}
        {step === 3 && <StepBoxColor box={appState.box} color={appState.color} setColor={c=>patchState({color:c})} aiRec={appState.aiRec} monthly={appState.monthly} onNext={handleGenerateDesign} onBack={()=>setStep(2)}/>}
        {step === 4 && <StepDesign state={appState} setState={patch=>setAppState(s=>({...s,...patch}))} onNext={()=>setStep(5)} onBack={()=>setStep(3)}/>}
        {step === 5 && <StepOutput state={appState} onEdit={()=>setStep(4)}/>}
      </main>
    </>
  )
}
