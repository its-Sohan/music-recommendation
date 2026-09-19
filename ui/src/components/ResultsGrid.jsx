import { useState } from 'react'

export default function ResultsGrid({ recommendations }) {
  const [sortBy, setSortBy] = useState('similarity')

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <div className="text-4xl mb-4">🎵</div>
        <p>Select seed songs and click recommend to see results.</p>
      </div>
    )
  }

  const sorted = [...recommendations].sort((a, b) => {
    if (sortBy === 'similarity') return b.similarity - a.similarity
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    return 0
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Recommendations ({recommendations.length})</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm bg-slate-800 border border-slate-700 rounded px-2 py-1"
        >
          <option value="similarity">By Similarity</option>
          <option value="title">By Title</option>
        </select>
      </div>
      <div className="grid gap-3">
        {sorted.map((song) => (
          <div key={song.id} className="p-4 bg-slate-900 rounded-lg border border-slate-800">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{song.title}</div>
                <div className="text-sm text-slate-400">{song.artist}</div>
              </div>
              <div className="text-sm font-mono text-blue-400">{(song.similarity * 100).toFixed(1)}%</div>
            </div>
            <div className="mt-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${Math.max(0, Math.min(100, song.similarity * 100))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
