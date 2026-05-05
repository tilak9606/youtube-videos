import { ChevronLeft, ChevronRight } from 'lucide-react'

function Pagination({ currentPage, totalPages, totalItems, onPageChange }) {
  const getVisiblePages = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-200">
      <p className="text-sm text-slate-500">
        Showing <span className="font-semibold text-slate-700">{(currentPage - 1) * 10 + 1}</span> to{' '}
        <span className="font-semibold text-slate-700">{Math.min(currentPage * 10, totalItems)}</span> of{' '}
        <span className="font-semibold text-slate-700">{totalItems}</span> videos
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer"
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className="w-9 h-9 flex items-center justify-center text-sm text-slate-400">...</span>
            )}
          </>
        )}

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              page === currentPage
                ? 'bg-red-600 text-white border border-red-600 shadow-sm'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {page}
          </button>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="w-9 h-9 flex items-center justify-center text-sm text-slate-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Pagination