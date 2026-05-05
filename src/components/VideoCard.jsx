import { useState } from 'react'
import { Play, Eye, ThumbsUp, MessageCircle, Clock, ExternalLink } from 'lucide-react'

function VideoCard({ video, index }) {
  const [imageError, setImageError] = useState(false)

  const snippet = video.snippet || {}
  const statistics = video.statistics || {}
  const contentDetails = video.contentDetails || {}

  const title = snippet.title || 'Untitled Video'
  const channelTitle = snippet.channelTitle || 'Unknown Channel'
  const description = snippet.description || ''
  const thumbnail = snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || ''
  const publishedAt = snippet.publishedAt ? new Date(snippet.publishedAt) : null

  const viewCount = parseInt(statistics.viewCount || 0)
  const likeCount = parseInt(statistics.likeCount || 0)
  const commentCount = parseInt(statistics.commentCount || 0)

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatDuration = (duration) => {
    if (!duration) return ''
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return ''
    const hours = match[1] ? parseInt(match[1]) : 0
    const minutes = match[2] ? parseInt(match[2]) : 0
    const seconds = match[3] ? parseInt(match[3]) : 0

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const formatDate = (date) => {
    if (!date) return ''
    const now = new Date()
    const diff = now - date
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`
    if (days < 365) return `${Math.floor(days / 30)} months ago`
    return `${Math.floor(days / 365)} years ago`
  }

  const videoUrl = `https://www.youtube.com/watch?v=${video.id}`

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-red-300 transition-all duration-300 animate-slide-up overflow-hidden flex flex-col group"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-slate-900 overflow-hidden">
        {!imageError ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800">
            <Play className="w-12 h-12 text-slate-600" />
          </div>
        )}

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
            <Play className="w-6 h-6 text-white ml-1" fill="white" />
          </div>
        </div>

        {/* Duration Badge */}
        {contentDetails.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(contentDetails.duration)}
          </div>
        )}

        {/* HD Badge */}
        {contentDetails.definition === 'hd' && (
          <div className="absolute top-2 left-2 bg-black/80 text-white text-xs font-bold px-2 py-0.5 rounded">
            HD
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex gap-3">
          {/* Channel Avatar Placeholder */}
          <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold text-red-600">
              {channelTitle.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-slate-900 line-clamp-2 leading-snug mb-1 group-hover:text-red-600 transition-colors">
              {title}
            </h2>
            <p className="text-sm text-slate-600 font-medium mb-1">{channelTitle}</p>
            <p className="text-xs text-slate-400 mb-2">{formatDate(publishedAt)}</p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {formatNumber(viewCount)}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3.5 h-3.5" />
                {formatNumber(likeCount)}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                {formatNumber(commentCount)}
              </span>
            </div>
          </div>
        </div>

        {/* Description Preview */}
        {description && (
          <p className="mt-3 text-xs text-slate-400 line-clamp-2 border-t border-slate-100 pt-2">
            {description}
          </p>
        )}

        {/* Watch Button */}
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 text-sm font-medium rounded-lg transition-all duration-200 group/link"
        >
          <ExternalLink className="w-4 h-4" />
          Watch on YouTube
        </a>
      </div>
    </div>
  )
}

export default VideoCard