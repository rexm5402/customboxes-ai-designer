export const BOXES = {
  std: [
    { id:'s1', name:'Small Standard',      dims:'6×4×2',  l:6,  w:4,  h:2,  ect:'32',    maxLbs:30, desc:'Jewelry, cosmetics, small accessories, sample kits',           price:1.45 },
    { id:'s2', name:'Standard Small-Med',  dims:'8×6×4',  l:8,  w:6,  h:4,  ect:'32',    maxLbs:30, desc:'Books, candles, small apparel, skincare sets',                 price:1.55 },
    { id:'s3', name:'Standard Medium',     dims:'10×8×6', l:10, w:8,  h:6,  ect:'32',    maxLbs:30, desc:'Shoes, electronics, multi-unit food & bev',                   price:1.85 },
    { id:'s4', name:'Standard Large',      dims:'12×10×8',l:12, w:10, h:8,  ect:'32',    maxLbs:30, desc:'Clothing bundles, home goods, multi-box kits',                price:2.10 },
    { id:'s5', name:'Standard XL',         dims:'16×12×10',l:16,w:12, h:10, ect:'32',    maxLbs:30, desc:'Large apparel, sports gear, multi-product bundles',           price:2.45 },
  ],
  pop: [
    { id:'p1', name:'Cube Box',            dims:'8×8×8',  l:8,  w:8,  h:8,  ect:'32',    maxLbs:30, desc:'Candles, gifts, curated boxes, subscription kits',            price:1.75 },
    { id:'p2', name:'Tall Mailer',         dims:'12×6×4', l:12, w:6,  h:4,  ect:'32',    maxLbs:30, desc:'Apparel, folded garments, rolled items, books',               price:1.80 },
    { id:'p3', name:'Flat Mailer',         dims:'14×10×2',l:14, w:10, h:2,  ect:'32',    maxLbs:15, desc:'Art prints, documents, flat accessories, cards',              price:1.50 },
    { id:'p4', name:'Heavy Duty Medium',   dims:'12×10×10',l:12,w:10, h:10, ect:'heavy', maxLbs:65, desc:'Tools, ceramics, glassware, fragile goods',                  price:3.20 },
    { id:'p5', name:'Heavy Duty XL',       dims:'18×14×12',l:18,w:14, h:12, ect:'heavy', maxLbs:65, desc:'Equipment, large fragile items, industrial goods',            price:3.80 },
  ],
  any: [
    { id:'a1', name:'Any Size Small',      dims:'Up to 10"',l:10,w:10, h:10, ect:'32',   maxLbs:30, desc:'Custom dims up to 10" per side, ECT-32',                      price:2.20 },
    { id:'a2', name:'Any Size Medium',     dims:'Up to 18"',l:18,w:18, h:18, ect:'32',   maxLbs:30, desc:'Custom dims up to 18" per side, ECT-32',                      price:2.90 },
    { id:'a3', name:'Any Size Heavy',      dims:'Up to 24"',l:24,w:24, h:24, ect:'heavy',maxLbs:65, desc:'Custom heavy duty up to 24" per side, ECT-HD',                price:4.20 },
  ]
}
export const ALL_BOXES = [...BOXES.std, ...BOXES.pop, ...BOXES.any]

export const QA_STEPS = [
  { id:'weight', q:'How heavy is a typical shipment?', hint:'Determines board grade (ECT-32 vs Heavy Duty)',
    opts:[{icon:'🪶',l:'Under 5 lbs',v:'light'},{icon:'📦',l:'5–15 lbs',v:'medium'},{icon:'🏋️',l:'15–30 lbs',v:'heavy'},{icon:'⚙️',l:'Over 30 lbs',v:'xheavy'}] },
  { id:'size', q:'How large is your typical product?', hint:'Approximate packed size',
    opts:[{icon:'💍',l:'Very small (fits in hand)',v:'xs'},{icon:'📗',l:'Small (shoebox)',v:'sm'},{icon:'👟',l:'Medium (1–2 shoeboxes)',v:'md'},{icon:'🛋️',l:'Large (multiple items)',v:'lg'}] },
  { id:'qty', q:'How many items per shipment?', hint:'Single unit or multi-pack?',
    opts:[{icon:'1️⃣',l:'Single item',v:'single'},{icon:'🔢',l:'2–5 items',v:'few'},{icon:'📚',l:'6–12 items',v:'several'},{icon:'🗃️',l:'12+ items',v:'many'}] },
  { id:'fragile', q:'How fragile is your product?', hint:'Fragile items need more protective sizing',
    opts:[{icon:'💪',l:'Durable (no inserts)',v:'durable'},{icon:'📖',l:'Moderate (some padding)',v:'moderate'},{icon:'🔮',l:'Fragile (bubble wrap/foam)',v:'fragile'},{icon:'⚗️',l:'Very fragile (custom inserts)',v:'vfragile'}] },
  { id:'fit', q:'What fit style do you prefer?', hint:'Tight fits look premium; loose fits allow inserts',
    opts:[{icon:'🎯',l:'Snug / tight',v:'snug'},{icon:'📐',l:'Standard clearance',v:'standard'},{icon:'🛡️',l:'Loose / protective',v:'loose'}] },
  { id:'aesthetic', q:'What visual style matches your brand?', hint:'Helps us recommend kraft vs white',
    opts:[{icon:'🌿',l:'Natural / earthy / artisan',v:'natural'},{icon:'✨',l:'Clean / premium / minimal',v:'premium'},{icon:'⚙️',l:'Industrial / functional',v:'industrial'},{icon:'🎨',l:'Bold / expressive / playful',v:'bold'}] },
]

export function mockBrand(url) {
  const domain = url.replace(/https?:\/\//,'').split('/')[0].replace('www.','').split('.')[0]
  const name = domain.charAt(0).toUpperCase() + domain.slice(1)
  return {
    companyName: name, tagline: 'Quality you can trust, delivered with care.',
    tone: 'Professional, approachable, trustworthy',
    targetCustomer: 'Small to mid-size businesses and direct consumers',
    colorPalette: ['#1a1a1a','#c8924a'], typography: 'Clean sans-serif with bold headlines',
    positioning: 'Premium quality at accessible prices',
    packagingStyle: 'Clean, branded corrugated — logo-forward with restrained layout',
    designDirection: 'Centered wordmark on front, minimal side panels, barcode on bottom',
    trustSignals: ['Fast shipping','Quality guaranteed','Eco-friendly'],
    colorRec: 'kraft', colorRationale: 'Kraft conveys authenticity and sustainability.',
    summaryQuote: 'A brand built on quality and care — packaging should reflect the same.',
    industry: 'General e-commerce',
  }
}
export function mockDesign() {
  return {
    front: { primary:'Centered brand wordmark with rule', secondary:'Tagline below rule', tertiary:'' },
    side:  { primary:'Brand name horizontal', secondary:'' },
    top:   { primary:'Small brand mark', secondary:'' },
    back:  { primary:'Website URL + barcode area', secondary:'' },
    bottom:{ primary:'Barcode area + this side up', secondary:'' },
    border: 'thin-line', logoStyle: 'centered',
    philosophy: 'Clean, restrained black-on-kraft design. Let the brand breathe.',
    printNotes: 'All strokes min 1pt. No gradients. Vector logo at 1200dpi. 0.25" safe margins.',
    tagline: 'Quality products, delivered.',
  }
}
export function mockBoxRec(answers) {
  const heavy = answers.weight === 'xheavy'
  const large = answers.size === 'lg'
  const box = heavy ? ALL_BOXES.find(b=>b.id==='p4') : large ? ALL_BOXES.find(b=>b.id==='s4') : ALL_BOXES.find(b=>b.id==='s3')
  return { boxId: box.id, boxName: box.name, confidence: 82,
    rationale: 'Based on your product weight and size, this box offers the best fit.',
    colorRec: answers.aesthetic === 'premium' ? 'white' : 'kraft',
    colorRationale: 'Matches your brand aesthetic.' }
}
