export type FeaturedVideo = {
  title: string;
  description: string;
  youtubeId: string;
};

// Add a published YouTube video ID (11 characters), title and description.
// Empty entries are ignored; no section or navigation is rendered until a video is ready.
export const featuredVideos: FeaturedVideo[] = [];

export const publishedVideos = featuredVideos.filter(
  (video) => video.title.trim() && /^[A-Za-z0-9_-]{11}$/.test(video.youtubeId),
);
