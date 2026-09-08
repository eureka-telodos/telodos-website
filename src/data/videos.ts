export type FeaturedVideo = {
  title: string;
  description: string;
  youtubeId: string;
};

// Add a published YouTube video ID (11 characters), title and description.
// Empty entries are ignored; no section or navigation is rendered until a video is ready.
export const featuredVideos: FeaturedVideo[] = [];

// Cloudflare supplies this build-time value. main and local builds default to hidden.
export const previewVideos = process.env.WORKERS_CI_BRANCH === 'feat/news-timeline-contact';

export const publishedVideos = featuredVideos.filter(
  (video) => video.title.trim() && /^[A-Za-z0-9_-]{11}$/.test(video.youtubeId),
);
