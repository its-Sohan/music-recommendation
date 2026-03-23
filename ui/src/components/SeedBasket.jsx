export default function SeedBasket({ seeds, onRemove }) {
  if (seeds.length === 0) {
    return (
      <div className="mb-6 p-4 bg-slate-900 rounded-lg text-slate-400">
        No songs selected yet. Search and pick up to 5 seed tracks.
      </div>
    )
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Your Seed Songs ({seeds.length}/5)</h2>
        <span className="text-xs text-slate-500">Click ✕ to remove</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {seeds.map((song, index) => (
          <div key={song.id} className="flex items-center gap-2 px-3 py-2 bg-blue-900/40 border border-blue-700 rounded-full">
            <span className="text-xs text-blue-300 font-mono">{index + 1}</span>
            <span className="text-sm">{song.title} — {song.artist}</span>
            <button
              onClick={() => onRemove(song.id)}
              className="text-blue-300 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      {seeds.length >= 5 && (
        <p className="text-sm text-yellow-400 mt-2">Maximum 5 seed songs reached.</p>
      )}
    </div>
  )
}
