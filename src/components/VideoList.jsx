import { useFetchVideos } from '../hooks/useFetchVideos.js'
import VideoCard from './VideoCard.jsx'
import Pagination from './Pagination.jsx'
import LoadingSpinner from './LoadingSpinner.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import { RefreshCw, Play } from 'lucide-react'

function VideoList() {
  const { videos, loading, error, page, totalPages, totalItems, goToPage, refresh } = useFetchVideos()

  if (loading && videos.length === 0) {
    return <LoadingSpinner />
  }

  if (error && videos.length === 0) {
    return <ErrorMessage message={error} onRetry={refresh} />
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Play className="w-4 h-4" />
          <span className="font-medium">{totalItems}</span> total videos
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <VideoCard key={video.id} video={video} index={index} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={goToPage}
        />
      )}
    </div>
  )
}

export default VideoList