import { useState } from 'react'
import SearchBar from './components/SearchBar'
import SeedBasket from './components/SeedBasket'
import ResultsGrid from './components/ResultsGrid'
import { getRecommendations } from './services/api'

function App() {
  const [seeds, setSeeds] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const addSeed = (song) => {
    if (seeds.length >= 5) return
    if (seeds.some((s) => s.id === song.id)) return
    setSeeds([...seeds, song])
  }

  const removeSeed = (id) => {
    setSeeds(seeds.filter((s) => s.id !== id))
  }

  const fetchRecommendations = async () => {
    if (seeds.length === 0) return
    setLoading(true)
    setError(null)
    try {
      const data = await getRecommendations(seeds.map(s => s.id))
      setRecommendations(data.recommendations || [])
    } catch (err) {
      setError(err.message)
      setRecommendations([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Music Recommender</h1>
      <p className="mb-6 text-slate-400">
        Pick a few songs you like, and we'll find similar ones using cosine similarity on learned embeddings.
      </p>
      <SearchBar onSelect={addSeed} />
      <SeedBasket seeds={seeds} onRemove={removeSeed} />
      {seeds.length > 0 && (
        <button
          onClick={fetchRecommendations}
          disabled={loading}
          className="mb-6 px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 rounded-lg font-medium transition-colors"
        >
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      )}
      {error && <div className="mb-6 text-red-400">{error}</div>}
      <ResultsGrid recommendations={recommendations} />
    </div>
  )
}

export default App
