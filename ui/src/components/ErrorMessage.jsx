export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-300">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-red-400">⚠</span>
        <span className="font-medium">Something went wrong</span>
      </div>
      <p className="text-sm mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm px-3 py-1 bg-red-800 hover:bg-red-700 rounded transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
