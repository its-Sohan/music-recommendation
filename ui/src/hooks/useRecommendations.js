import { useState, useCallback } from 'react'
import { getRecommendations } from '../services/api'

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRecommendations = useCallback(async (seedIds) => {
    if (seedIds.length === 0) return
    setLoading(true)
    setError(null)
    try {
      const data = await getRecommendations(seedIds)
      setRecommendations(data.recommendations || [])
    } catch (err) {
      setError(err.message)
      setRecommendations([])
    } finally {
      setLoading(false)
    }
  }, [])

  const clear = useCallback(() => {
    setRecommendations([])
    setError(null)
  }, [])

  return { recommendations, loading, error, fetchRecommendations, clear }
}
