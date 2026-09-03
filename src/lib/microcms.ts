import { news as fallbackNews, type NewsItem } from '../data/news';

const serviceDomain = 'etdnews';
const endpoint = 'news';

type MicroCmsImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type MicroCmsNews = {
  id: string;
  title: string;
  category?: string | string[];
  description: string;
  thumbnail?: MicroCmsImage;
  link?: string;
  publishedAt: string;
};

type MicroCmsListResponse = {
  contents: MicroCmsNews[];
};

const formatDate = (value: string) => value.slice(0, 10).replaceAll('-', '.');

const normalizeCategory = (value?: string | string[]) => {
  if (Array.isArray(value)) return value[0] ?? 'お知らせ';
  return value || 'お知らせ';
};

export const getNews = async (): Promise<NewsItem[]> => {
  const apiKey = import.meta.env.MICROCMS_API_KEY;

  if (!apiKey) {
    console.warn('MICROCMS_API_KEY is not configured. Using local news data.');
    return fallbackNews;
  }

  try {
    const url = new URL(`https://${serviceDomain}.microcms.io/api/v1/${endpoint}`);
    url.searchParams.set('limit', '3');
    url.searchParams.set('orders', '-publishedAt');

    const response = await fetch(url, {
      headers: {
        'X-MICROCMS-API-KEY': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`microCMS request failed: ${response.status}`);
    }

    const data = (await response.json()) as MicroCmsListResponse;

    if (!data.contents.length) {
      return fallbackNews;
    }

    return data.contents.map((item) => ({
      title: item.title,
      date: formatDate(item.publishedAt),
      category: normalizeCategory(item.category),
      description: item.description,
      image: item.thumbnail?.url ?? '/images/hero/character-main.webp',
      imageAlt: item.thumbnail?.alt || item.title,
      href: item.link || undefined,
    }));
  } catch (error) {
    console.warn('Failed to load microCMS news. Using local news data.', error);
    return fallbackNews;
  }
};
