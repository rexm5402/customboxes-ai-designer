export default function Loading({ show, text = 'Processing…' }) {
  if (!show) return null
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(26,26,26,.88)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',zIndex:9999,gap:14,backdropFilter:'blur(4px)'}}>
      <div style={{width:48,height:48,border:'3px solid rgba(200,146,74,.2)',borderTopColor:'var(--kraft)',borderRadius:'50%',animation:'spin .7s linear infinite'}}/>
      <p style={{color:'#fff',fontFamily:'DM Mono,monospace',fontSize:12,letterSpacing:1.5,textTransform:'uppercase',opacity:.8}}>{text}</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
