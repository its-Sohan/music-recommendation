const API_BASE = '/api'

async function fetchWithRetry(url, options, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, options)
      if (!res.ok) {
        const error = new Error(`HTTP ${res.status}: ${res.statusText}`)
        error.status = res.status
        throw error
      }
      return res.json()
    } catch (err) {
      if (i === retries) throw err
      await new Promise(r => setTimeout(r, 1000 * (i + 1)))
    }
  }
}

export async function searchSongs(query) {
  return fetchWithRetry(`${API_BASE}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
}

export async function getRecommendations(seedIds, nResults = 20) {
  return fetchWithRetry(`${API_BASE}/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seed_ids: seedIds, n_results: nResults }),
  })
}
