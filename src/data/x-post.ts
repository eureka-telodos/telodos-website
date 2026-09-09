export type FeaturedPost = {
  url: string;
  text: string;
  publishedAt: string;
  dateLabel: string;
  image: string;
  imageAlt: string;
  avatar: string;
};

// Set from a real @eureka_td post, including its original date and image.
// No invented text, reaction counts or publication dates are displayed.
export const featuredPost: FeaturedPost | null = {
  url: 'https://x.com/eureka_td/status/2094186147215999368',
  text: 'おはゆりーか⚜️🦇\n\nリスペクトにリスペクトを重ねました🌟\nいつも本当にありがとう…',
  publishedAt: '2026-08-30T22:11:00.000Z',
  dateLabel: '2026年8月31日 午前7:11 · 日本時間',
  image: '/images/social/2094186147215999368.jpg',
  imageAlt: 'ユリーカのX投稿に添付された写真',
  avatar: '/images/social/eureka-avatar.jpg',
};
