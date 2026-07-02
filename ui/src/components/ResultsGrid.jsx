export default function ResultsGrid({ recommendations }) {
  if (recommendations.length === 0) {
    return <div className="text-slate-500">Select seed songs and click recommend to see results.</div>
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Recommendations</h2>
      <div className="grid gap-3">
        {recommendations.map((song) => (
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
