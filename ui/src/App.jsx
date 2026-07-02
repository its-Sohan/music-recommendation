import { useState } from 'react'
import SearchBar from './components/SearchBar'
import SeedBasket from './components/SeedBasket'
import ResultsGrid from './components/ResultsGrid'

function App() {
  const [seeds, setSeeds] = useState([])
  const [recommendations, setRecommendations] = useState([])

  const addSeed = (song) => {
    if (seeds.length >= 5) return
    if (seeds.some((s) => s.id === song.id)) return
    setSeeds([...seeds, song])
  }

  const removeSeed = (id) => {
    setSeeds(seeds.filter((s) => s.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Music Recommender</h1>
      <p className="mb-6 text-slate-400">
        Pick a few songs you like, and we'll find similar ones using cosine similarity on learned embeddings.
      </p>
      <SearchBar onSelect={addSeed} />
      <SeedBasket seeds={seeds} onRemove={removeSeed} />
      <ResultsGrid recommendations={recommendations} />
    </div>
  )
}

export default App
