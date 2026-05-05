import { useState, useCallback, useRef, useEffect } from 'react'

const API_URL = 'https://api.freeapi.app/api/v1/public/youtube/videos'

export function useFetchVideos() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const hasFetched = useRef(false)

  const fetchVideos = useCallback(async (pageNum = 1) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}?page=${pageNum}&limit=10`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch videos')
      }

      // The API returns data nested under data.data, with each item having an "items" property
      const videoData = result.data.data.map((item) => item.items)
      setVideos(videoData)
      setPage(result.data.page)
      setTotalPages(result.data.totalPages)
      setTotalItems(result.data.totalItems)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true
      fetchVideos(1)
    }
  }, [fetchVideos])

  const goToPage = useCallback((pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      fetchVideos(pageNum)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [fetchVideos, totalPages])

  const refresh = useCallback(() => {
    fetchVideos(page)
  }, [fetchVideos, page])

  return {
    videos,
    loading,
    error,
    page,
    totalPages,
    totalItems,
    goToPage,
    refresh,
  }
}