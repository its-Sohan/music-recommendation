import { useState, useCallback, useRef } from 'react'
import { searchSongs } from '../services/api'

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef(null)

  const handleSearch = useCallback(async (value) => {
    if (value.length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      const data = await searchSongs(value)
      setResults(data.results || [])
    } catch (err) {
      console.error('Search error:', err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    setSelectedIndex(-1)
    clearTimeout(window.__searchTimeout)
    window.__searchTimeout = setTimeout(() => handleSearch(value), 300)
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, -1))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      onSelect(results[selectedIndex])
      handleClear()
    } else if (e.key === 'Escape') {
      handleClear()
    }
  }

  return (
    <div className="relative mb-6">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a song or artist..."
        className="w-full p-3 pr-10 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:border-blue-500"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-3 text-slate-400 hover:text-white"
        >
          ✕
        </button>
      )}
      {loading && <div className="absolute right-10 top-3 text-sm text-slate-400">Loading...</div>}
      {results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg max-h-60 overflow-auto">
          {results.map((song, index) => (
            <li
              key={song.id}
              onClick={() => {
                onSelect(song)
                handleClear()
              }}
              className={`p-3 cursor-pointer ${
                index === selectedIndex ? 'bg-slate-700' : 'hover:bg-slate-800'
              }`}
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
