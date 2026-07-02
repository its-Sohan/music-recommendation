import { useState } from 'react'
import { searchSongs } from '../services/api'

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    const value = e.target.value
    setQuery(value)
    if (value.length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      const data = await searchSongs(value)
      setResults(data.results || [])
    } catch (err) {
      console.error(err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a song or artist..."
        className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-blue-500"
      />
      {loading && <div className="absolute right-3 top-3 text-sm text-slate-400">Loading...</div>}
      {results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg max-h-60 overflow-auto">
          {results.map((song) => (
            <li
              key={song.id}
              onClick={() => {
                onSelect(song)
                setQuery('')
                setResults([])
              }}
              className="p-3 hover:bg-slate-800 cursor-pointer"
            >
              <div className="font-medium">{song.title}</div>
              <div className="text-sm text-slate-400">{song.artist}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
