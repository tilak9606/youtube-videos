import { AlertCircle, RefreshCw } from 'lucide-react'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-red-800 mb-1">Something went wrong</h3>
        <p className="text-sm text-red-600 mb-4">{message}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  )
}

export default ErrorMessage