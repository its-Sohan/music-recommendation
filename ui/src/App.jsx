import SearchBar from './components/SearchBar'
import SeedBasket from './components/SeedBasket'
import ResultsGrid from './components/ResultsGrid'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import { useSeeds } from './hooks/useSeeds'
import { useRecommendations } from './hooks/useRecommendations'

function App() {
  const { seeds, seedIds, addSeed, removeSeed } = useSeeds()
  const { recommendations, loading, error, fetchRecommendations } = useRecommendations()

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
          onClick={() => fetchRecommendations(seedIds)}
          disabled={loading}
          className="mb-6 px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 rounded-lg font-medium transition-colors"
        >
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      )}
      {error && <ErrorMessage message={error} />}
      {loading && <LoadingSpinner />}
      {!loading && <ResultsGrid recommendations={recommendations} />}
    </div>
  )
}

export default App
