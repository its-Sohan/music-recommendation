export default function SongCard({ song, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-slate-900 rounded-lg border border-slate-800 hover:border-blue-500 hover:bg-slate-800 cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center text-slate-500">
          🎵
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{song.title}</div>
          <div className="text-sm text-slate-400 truncate">{song.artist}</div>
          {song.album && (
            <div className="text-xs text-slate-500 truncate">{song.album}</div>
          )}
        </div>
      </div>
    </div>
  )
}
