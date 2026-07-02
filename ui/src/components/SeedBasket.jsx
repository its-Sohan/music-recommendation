export default function SeedBasket({ seeds, onRemove }) {
  if (seeds.length === 0) {
    return <div className="mb-6 p-4 bg-slate-900 rounded-lg text-slate-400">No songs selected yet. Search and pick up to 5.</div>
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Your Seed Songs</h2>
      <div className="flex flex-wrap gap-2">
        {seeds.map((song) => (
          <div key={song.id} className="flex items-center gap-2 px-3 py-2 bg-blue-900/40 border border-blue-700 rounded-full">
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
    </div>
  )
}
