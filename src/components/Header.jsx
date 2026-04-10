export default function Header({ step, onChangeKey }) {
  const tabs = ['Brand URL','Brand Analysis','Box Sizing','Box & Color','Design Studio','Final Output']
  return (
    <>
      <header style={{background:'var(--ink)',color:'#fff',padding:'0 28px',height:60,display:'flex',alignItems:'center',borderBottom:'3px solid var(--kraft)',position:'sticky',top:0,zIndex:300}}>
        <div style={{maxWidth:1300,width:'100%',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16}}>
          <a href="https://customboxes.io" target="_blank" rel="noreferrer" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
            <div style={{width:36,height:36,background:'var(--kraft)',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Playfair Display,serif',fontSize:17,fontWeight:700,color:'var(--ink)'}}>CB</div>
            <span style={{fontFamily:'Playfair Display,serif',fontSize:19,color:'#fff'}}>Custom<span style={{color:'var(--kraft)'}}>Boxes</span>.io</span>
          </a>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'rgba(255,255,255,.4)',border:'1px solid rgba(255,255,255,.15)',padding:'3px 10px',borderRadius:100}}>AI Packaging Designer</span>
          <button onClick={onChangeKey} style={{background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.2)',borderRadius:6,padding:'6px 12px',color:'rgba(255,255,255,.7)',fontFamily:'DM Mono,monospace',fontSize:11,cursor:'pointer',transition:'all .2s'}}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.15)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.08)'}>
            🔑 Change Key
          </button>
        </div>
      </header>
      <nav style={{background:'#fff',borderBottom:'1px solid var(--bdr)',position:'sticky',top:60,zIndex:200,padding:'0 28px',overflowX:'auto'}}>
        <div style={{maxWidth:1300,margin:'0 auto',display:'flex'}}>
          {tabs.map((t,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:7,padding:'12px 16px',borderBottom:`2.5px solid ${i===step?'var(--kraft)':'transparent'}`,fontSize:12.5,fontWeight:i===step?600:500,color:i<step?'var(--kraft-d)':i===step?'var(--ink)':'#bbb',whiteSpace:'nowrap',userSelect:'none'}}>
              <div style={{width:22,height:22,borderRadius:'50%',background:i<step?'var(--kraft-l)':i===step?'var(--ink)':'var(--bdr)',fontFamily:'DM Mono,monospace',fontSize:11,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',color:i<step?'var(--kraft-d)':i===step?'#fff':'#999',flexShrink:0}}>
                {i < step ? '✓' : i+1}
              </div>
              {t}
            </div>
          ))}
        </div>
      </nav>
    </>
  )
}
