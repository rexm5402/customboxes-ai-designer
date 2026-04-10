const SEED_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemma-3-27b-it:free',
  'mistralai/mistral-small-3.1-24b-instruct:free',
  'qwen/qwen2.5-72b-instruct:free',
  'microsoft/phi-4:free',
  'google/gemma-3-12b-it:free',
  'meta-llama/llama-4-scout:free',
  'meta-llama/llama-4-maverick:free',
  'google/gemma-3-4b-it:free',
]

let liveModels = [...SEED_MODELS]
const badModels = new Set()

export function getKey() {
  return sessionStorage.getItem('or_key') || ''
}
export function setKey(k) {
  sessionStorage.setItem('or_key', k.trim())
}
export function clearKey() {
  sessionStorage.removeItem('or_key')
}

export async function discoverModels() {
  const key = getKey()
  if (!key) return
  try {
    const res = await fetch('https://openrouter.ai/api/v1/models', {
      headers: { Authorization: 'Bearer ' + key }
    })
    if (!res.ok) return
    const d = await res.json()
    const live = (d.data || []).map(m => m.id).filter(id => id.endsWith(':free'))
    const merged = [...SEED_MODELS]
    for (const id of live) if (!merged.includes(id)) merged.push(id)
    liveModels = merged
  } catch { /* keep seeds */ }
}

async function callOR(messages, maxTokens = 1200) {
  const key = getKey()
  if (!key) throw new Error('NO_KEY')
  const queue = liveModels.filter(m => !badModels.has(m))
  const toTry = queue.length ? queue : [...liveModels]
  let lastErr
  for (const model of toTry) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + key,
          'HTTP-Referer': 'https://customboxes.io',
          'X-Title': 'CustomBoxes AI Designer',
        },
        body: JSON.stringify({ model, max_tokens: maxTokens, temperature: 0.7, messages }),
      })
      const d = await res.json()
      if (!res.ok || d.error) {
        const msg = (d.error?.message || '').toLowerCase()
        if (res.status === 401 || msg.includes('invalid api key') || msg.includes('unauthorized')) {
          throw new Error('INVALID_KEY')
        }
        if (res.status === 404 || msg.includes('no endpoint') || msg.includes('not a valid model') || msg.includes('invalid model')) {
          badModels.add(model); lastErr = new Error(d.error?.message); continue
        }
        if (res.status === 429 || res.status === 503 || msg.includes('overload') || msg.includes('capacity')) {
          lastErr = new Error(d.error?.message); continue
        }
        throw new Error(d.error?.message || 'OpenRouter error ' + res.status)
      }
      const txt = d.choices?.[0]?.message?.content
      if (!txt) { lastErr = new Error('Empty response'); continue }
      return txt.trim()
    } catch (e) {
      if (e.message === 'INVALID_KEY') throw e
      lastErr = e; continue
    }
  }
  throw lastErr || new Error('All models are currently unavailable. Please try again.')
}

export async function askJSON(sys, user) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const txt = await callOR([{ role: 'system', content: sys }, { role: 'user', content: user }], 1400)
      const clean = txt.replace(/^```json\s*/,'').replace(/^```\s*/,'').replace(/\s*```$/,'').trim()
      const m = clean.match(/\{[\s\S]*\}/)
      if (!m) { await sleep(800); continue }
      return JSON.parse(m[0])
    } catch (e) {
      if (e.message === 'INVALID_KEY' || e.message === 'NO_KEY') throw e
      if (attempt === 2) throw e
      await sleep(800)
    }
  }
}

export async function askText(sys, messages) {
  return callOR([{ role: 'system', content: sys }, ...messages], 700)
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }
