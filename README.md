## YouTube Videos Listing UI

A React-based YouTube-style video listing interface using the Videos API.

**Live Demo:** https://youtube-videos-omega.vercel.app/

**GitHub Repo:** https://github.com/tilak9606/youtube-videos

---

### Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- Lucide React

---

### API Endpoint
https://api.freeapi.app/api/v1/public/youtube/videos

---

### Features

- Fetches videos with pagination (10 per page, 157 total)
- YouTube-style video card grid with thumbnails
- Hover play button overlay on thumbnails
- Video duration badge (formatted from ISO 8601)
- HD quality badge
- Channel avatar with initial letter
- View count, like count, and comment count formatting (K/M)
- Relative time display (e.g., "2 days ago", "3 months ago")
- Description preview with line clamp
- "Watch on YouTube" external link button
- Pagination with page numbers and navigation
- Loading states and error handling with retry
- Refresh button to reload current page
- Staggered card entrance animations
- Responsive grid layout (1-4 columns)

---

### Getting Started

```bash
git clone git@github.com:tilak9606/youtube-videos.git
cd youtube-videos
npm install
npm run dev
