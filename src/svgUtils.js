export function render3D({ box, color, brand, design, logo, lscale, panels }) {
  const bg = color === 'white' ? '#f5f5f3' : '#c8924a'
  const sh = color === 'white' ? '#d8d8d5' : '#9b6b2a'
  const ink = '#1a1a1a'
  const W = 500, H = 380
  const name = (brand?.companyName || 'BRAND').toUpperCase()
  const tag = design?.tagline || brand?.tagline || ''
  const sc = (lscale || 60) / 100
  const lw = 110 * sc, lh = 44 * sc
  const bdr = design?.border || 'thin-line'
  const fcy = Math.round((80 + (H - 40)) / 2) - 5
  const fcx = 160

  let borderSVG = ''
  if (bdr === 'thin-line') borderSVG = `<rect x="74" y="94" width="172" height="${H-40-94}" fill="none" stroke="${ink}" stroke-width=".9"/>`
  else if (bdr === 'double-line') borderSVG = `<rect x="72" y="92" width="176" height="${H-40-92}" fill="none" stroke="${ink}" stroke-width=".7"/><rect x="77" y="97" width="166" height="${H-40-97}" fill="none" stroke="${ink}" stroke-width=".7"/>`
  else if (bdr === 'corner-marks') borderSVG = [[74,92],[228,92],[74,H-44],[228,H-44]].map(([px,py]) =>
    `<path d="M${px},${py+12}L${px},${py}L${px+12},${py}" fill="none" stroke="${ink}" stroke-width="1"/>`).join('')

  const frontContent = (panels?.front && logo)
    ? `<image href="${logo}" x="${fcx-lw/2}" y="${fcy-lh/2-12}" width="${lw}" height="${lh}" preserveAspectRatio="xMidYMid meet"/>`
    : `<text x="${fcx}" y="${fcy-10}" font-size="20" font-weight="700" font-family="Georgia,serif" fill="${ink}" text-anchor="middle" letter-spacing="4">${name.substring(0,12)}</text>`

  const topContent = (panels?.top && logo)
    ? `<image href="${logo}" x="150" y="34" width="72" height="28" opacity=".7" preserveAspectRatio="xMidYMid meet"/>`
    : `<text x="195" y="57" font-size="10" font-family="Georgia,serif" fill="${ink}" text-anchor="middle" opacity=".6" letter-spacing="2">${name.substring(0,10)}</text>`

  const sideContent = (panels?.side && logo)
    ? `<image href="${logo}" x="268" y="${fcy-18}" width="54" height="22" opacity=".8" preserveAspectRatio="xMidYMid meet"/>`
    : `<text x="295" y="${fcy}" font-size="9" font-family="Georgia,serif" fill="${ink}" text-anchor="middle" opacity=".7" transform="rotate(-90,295,${fcy})" letter-spacing="2">${name.substring(0,8)}</text>`

  return `<svg viewBox="0 0 ${W} ${H}" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${bg}"/><stop offset="100%" stop-color="${sh}"/></linearGradient>
      <linearGradient id="tg" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="${sh}"/><stop offset="100%" stop-color="${bg}" stop-opacity=".88"/></linearGradient>
      <linearGradient id="sg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${sh}" stop-opacity=".72"/><stop offset="100%" stop-color="${sh}"/></linearGradient>
      <filter id="bsf"><feDropShadow dx="6" dy="12" stdDeviation="10" flood-opacity=".18"/></filter>
    </defs>
    <ellipse cx="240" cy="${H-20}" rx="150" ry="16" fill="rgba(0,0,0,.08)"/>
    <g filter="url(#bsf)">
      <polygon points="60,${H-40} 60,80 260,80 260,${H-40}" fill="url(#fg)" stroke="${ink}" stroke-width="1.2"/>
      ${borderSVG}
      ${frontContent}
      <line x1="88" y1="${fcy+8}" x2="232" y2="${fcy+8}" stroke="${ink}" stroke-width=".75" opacity=".55"/>
      ${tag ? `<text x="${fcx}" y="${fcy+22}" font-size="8.5" font-family="Georgia,serif" fill="${ink}" text-anchor="middle" opacity=".65" font-style="italic">${tag.substring(0,32)}</text>` : ''}
      <polygon points="60,80 130,24 330,24 260,80" fill="url(#tg)" stroke="${ink}" stroke-width="1.2"/>
      ${topContent}
      <polygon points="260,80 330,24 330,${H-100} 260,${H-40}" fill="url(#sg)" stroke="${ink}" stroke-width="1.2"/>
      ${sideContent}
    </g>
  </svg>`
}

export function render2D({ box, color, brand, design, logo, lscale, panels }) {
  const bg = color === 'white' ? '#f5f5f3' : '#e8b86a'
  const ink = '#1a1a1a'
  const name = (brand?.companyName || 'BRAND').toUpperCase()
  const tag = design?.tagline || brand?.tagline || ''
  const bdr = design?.border || 'thin-line'
  const pw = 180, ph = 160, sidew = 90, flp = 80
  const sc = (lscale || 60) / 100
  const lw = 80 * sc, lh = 32 * sc
  const SVW = 800, SVH = 560
  const cX = 260, cY = 180
  const pnls = [
    { id:'topflap', x:cX,        y:cY-flp,     w:pw,         h:flp, label:'TOP FLAP',   col:'rgba(0,0,0,.04)', dash:true },
    { id:'front',   x:cX,        y:cY,          w:pw,         h:ph,  label:'FRONT ★',    col:bg,               dash:false },
    { id:'back',    x:cX,        y:cY+ph,       w:pw,         h:ph,  label:'BACK',       col:color==='white'?'#ececea':'#d4a060', dash:false },
    { id:'botflap', x:cX,        y:cY+ph*2,     w:pw,         h:flp, label:'BOT FLAP',   col:'rgba(0,0,0,.04)', dash:true },
    { id:'left',    x:cX-sidew,  y:cY,          w:sidew,      h:ph,  label:'LEFT SIDE',  col:color==='white'?'#f0f0ee':'#dba654', dash:false },
    { id:'right',   x:cX+pw,     y:cY,          w:sidew,      h:ph,  label:'RIGHT SIDE', col:color==='white'?'#f0f0ee':'#dba654', dash:false },
    { id:'top',     x:cX-sidew,  y:cY-flp-90,   w:sidew+pw+sidew, h:90, label:'TOP',    col:color==='white'?'#e8e8e6':'#cc9a50', dash:false },
  ]
  const fcx = cX + pw/2, fcy = cY + ph/2
  let borderSVG = ''
  if (bdr === 'thin-line') borderSVG = `<rect x="${cX+6}" y="${cY+16}" width="${pw-12}" height="${ph-22}" fill="none" stroke="${ink}" stroke-width=".8"/>`
  else if (bdr === 'double-line') borderSVG = `<rect x="${cX+5}" y="${cY+15}" width="${pw-10}" height="${ph-20}" fill="none" stroke="${ink}" stroke-width=".7"/><rect x="${cX+9}" y="${cY+19}" width="${pw-18}" height="${ph-28}" fill="none" stroke="${ink}" stroke-width=".7"/>`
  else if (bdr === 'corner-marks') borderSVG = [[cX+8,cY+18],[cX+pw-8,cY+18],[cX+8,cY+ph-8],[cX+pw-8,cY+ph-8]].map(([cx,cy2]) =>
    `<path d="M${cx},${cy2+10}L${cx},${cy2}L${cx+10},${cy2}" fill="none" stroke="${ink}" stroke-width="1"/>`).join('')

  const rects = pnls.map(p =>
    `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" fill="${p.col}" stroke="${ink}" stroke-width="${p.id==='front'?'1.5':'1'}" stroke-dasharray="${p.dash?'4,3':'none'}"/>
     <text x="${p.x+p.w/2}" y="${p.y+12}" font-size="8" font-family="monospace" fill="${ink}" text-anchor="middle" opacity=".5" font-weight="600">${p.label}</text>`).join('')

  const sideContent = ['left','right'].map(sid => {
    const p = pnls.find(x=>x.id===sid)
    const scx = p.x+p.w/2, scy = p.y+p.h/2
    return (panels?.side && logo)
      ? `<image href="${logo}" x="${scx-28*sc}" y="${scy-11*sc}" width="${56*sc}" height="${22*sc}" opacity=".75" preserveAspectRatio="xMidYMid meet"/>`
      : `<text x="${scx}" y="${scy+4}" font-size="9" font-family="Georgia,serif" fill="${ink}" text-anchor="middle" opacity=".65" letter-spacing="2">${name.substring(0,8)}</text>`
  }).join('')

  const bp = pnls.find(x=>x.id==='back')

  return `<svg id="dieSVG" viewBox="0 0 ${SVW} ${SVH}" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10,0V0H0V10" fill="none" stroke="rgba(0,0,0,.05)" stroke-width=".5"/></pattern></defs>
    <rect width="${SVW}" height="${SVH}" fill="#f8f6f0"/>
    <rect width="${SVW}" height="${SVH}" fill="url(#grid)"/>
    ${rects}
    ${borderSVG}
    ${(panels?.front && logo) ? `<image href="${logo}" x="${fcx-lw/2}" y="${fcy-lh/2-8}" width="${lw}" height="${lh}" preserveAspectRatio="xMidYMid meet"/>` : `<text x="${fcx}" y="${fcy-4}" font-size="15" font-weight="700" font-family="Georgia,serif" fill="${ink}" text-anchor="middle" letter-spacing="2">${name.substring(0,14)}</text>`}
    <line x1="${cX+18}" y1="${fcy+8}" x2="${cX+pw-18}" y2="${fcy+8}" stroke="${ink}" stroke-width=".75" opacity=".5"/>
    ${tag ? `<text x="${fcx}" y="${fcy+20}" font-size="7" font-family="Georgia,serif" fill="${ink}" text-anchor="middle" opacity=".65" font-style="italic">${tag.substring(0,34)}</text>` : ''}
    ${sideContent}
    <text x="${bp.x+pw/2}" y="${bp.y+bp.h/2-10}" font-size="9" font-family="Georgia,serif" fill="${ink}" text-anchor="middle" opacity=".5">${name}</text>
    <rect x="${bp.x+pw/2-20}" y="${bp.y+bp.h/2+4}" width="40" height="15" fill="none" stroke="${ink}" stroke-width=".7" opacity=".45"/>
    <text x="${bp.x+pw/2}" y="${bp.y+bp.h/2+15}" font-size="5.5" font-family="monospace" fill="${ink}" text-anchor="middle" opacity=".4">BARCODE</text>
    <text x="${cX+pw/2}" y="${cY-flp-98}" font-size="8" font-family="monospace" fill="#999" text-anchor="middle">${box?.l||'L'}" × ${box?.w||'W'}"</text>
    <text x="${cX-sidew-14}" y="${cY+ph/2+4}" font-size="8" font-family="monospace" fill="#999" text-anchor="middle" transform="rotate(-90,${cX-sidew-14},${cY+ph/2})">${box?.h||'H'}"</text>
    <g transform="translate(14,${SVH-70})">
      <text font-size="8" font-family="monospace" fill="#999" y="0">PRODUCTION NOTES</text>
      <text font-size="7" font-family="monospace" fill="#bbb" y="12">• Min 1pt stroke  • No gradients  • Vector logo  • Black ink only</text>
      <text font-size="7" font-family="monospace" fill="#bbb" y="22">• 0.25" safe margin  • 300dpi  • ${box?.name||''}  ${box?.dims||''}"</text>
    </g>
  </svg>`
}
