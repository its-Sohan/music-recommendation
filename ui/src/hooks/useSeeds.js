import { useState, useCallback } from 'react'

const MAX_SEEDS = 5

export function useSeeds() {
  const [seeds, setSeeds] = useState([])

  const addSeed = useCallback((song) => {
    if (seeds.length >= MAX_SEEDS) return false
    if (seeds.some((s) => s.id === song.id)) return false
    setSeeds(prev => [...prev, song])
    return true
  }, [seeds])

  const removeSeed = useCallback((id) => {
    setSeeds(prev => prev.filter((s) => s.id !== id))
  }, [])

  const clearSeeds = useCallback(() => {
    setSeeds([])
  }, [])

  const seedIds = seeds.map(s => s.id)

  return { seeds, seedIds, addSeed, removeSeed, clearSeeds, isFull: seeds.length >= MAX_SEEDS }
}
