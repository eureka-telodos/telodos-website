export type ActivityBackground = {
  src: string;
  poster: string;
  position: string;
};

// Populate with the supplied finished video and a still from that video.
export const twitchBackground: ActivityBackground | null = {
  src: '/videos/activity-twitch.webm',
  poster: '/images/activity-twitch-poster.webp',
  position: 'center center',
};
