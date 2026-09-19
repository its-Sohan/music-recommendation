export default function SongCard({ song, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-slate-900 rounded-lg border border-slate-800 hover:border-blue-500 cursor-pointer transition-colors"
    >
      <div className="font-medium">{song.title}</div>
      <div className="text-sm text-slate-400">{song.artist}</div>
      {song.album && (
        <div className="text-xs text-slate-500 mt-1">{song.album}</div>
      )}
    </div>
  )
}
