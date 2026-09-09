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
export const featuredPost: FeaturedPost | null = null;
