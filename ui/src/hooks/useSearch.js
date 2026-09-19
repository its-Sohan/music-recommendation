import { useState, useCallback, useRef } from 'react'
import { searchSongs } from '../services/api'

export function useSearch(onSelect) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const timeoutRef = useRef(null)

  const search = useCallback(async (value) => {
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

  const handleChange = useCallback((e) => {
    const value = e.target.value
    setQuery(value)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => search(value), 300)
  }, [search])

  const clear = useCallback(() => {
    setQuery('')
    setResults([])
  }, [])

  const selectResult = useCallback((song) => {
    onSelect(song)
    clear()
  }, [onSelect, clear])

  return { query, results, loading, handleChange, clear, selectResult }
}
