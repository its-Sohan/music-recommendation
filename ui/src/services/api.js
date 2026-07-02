const API_BASE = '/api'

export async function searchSongs(query) {
  const res = await fetch(`${API_BASE}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  if (!res.ok) throw new Error('Search failed')
  return res.json()
}

export async function getRecommendations(seedIds, nResults = 20) {
  const res = await fetch(`${API_BASE}/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seed_ids: seedIds, n_results: nResults }),
  })
  if (!res.ok) throw new Error('Recommendations failed')
  return res.json()
}
