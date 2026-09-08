import type { NewsItem } from '../data/news';

export const newsConfigured = Boolean(import.meta.env.MICROCMS_API_KEY || process.env.MICROCMS_API_KEY);

// NEWS is fetched from microCMS during the Astro production build.
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
  totalCount: number;
};

const formatDate = (value: string) => value.slice(0, 10).replaceAll('-', '.');

const normalizeCategory = (value?: string | string[]) => {
  if (Array.isArray(value)) return value[0] ?? 'お知らせ';
  return value || 'お知らせ';
};

const loadNews = async (): Promise<NewsItem[]> => {
  const apiKey = import.meta.env.MICROCMS_API_KEY || process.env.MICROCMS_API_KEY;

  if (!apiKey) {
    if (process.env.WORKERS_CI_BRANCH === 'main') {
      throw new Error('MICROCMS_API_KEY is missing from the production build environment.');
    }
    console.warn('MICROCMS_API_KEY is missing. Preview news is unavailable; no legacy news will be shown.');
    return [];
  }

  try {
    const url = new URL(`https://${serviceDomain}.microcms.io/api/v1/${endpoint}`);
    url.searchParams.set('limit', '100');
    url.searchParams.set('orders', '-publishedAt');
    const contents: MicroCmsNews[] = [];
    let totalCount = 0;
    do {
      url.searchParams.set('offset', String(contents.length));
      const response = await fetch(url, {
        headers: { 'X-MICROCMS-API-KEY': apiKey },
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error(`microCMS request failed: ${response.status}`);
      const data = (await response.json()) as MicroCmsListResponse;
      if (!Array.isArray(data.contents) || !Number.isInteger(data.totalCount) || data.totalCount < 0) {
        throw new Error('Invalid microCMS news response');
      }
      totalCount = data.totalCount;
      if (!data.contents.length && contents.length < totalCount) {
        throw new Error('Incomplete microCMS news response');
      }
      contents.push(...data.contents);
    } while (contents.length < totalCount);

    return contents.map((item) => ({
      title: item.title,
      date: formatDate(item.publishedAt),
      category: normalizeCategory(item.category),
      description: item.description,
      image: item.thumbnail?.url ?? '/images/hero/character-main.webp',
      imageAlt: item.thumbnail?.alt || item.title,
      href: item.link && /^https?:\/\//i.test(item.link) ? item.link : undefined,
    }));
  } catch (error) {
    // Do not replace published news with stale fallback data on an API outage.
    console.error('Failed to load microCMS news; keeping the previous deployment.');
    throw error;
  }
};

let newsPromise: Promise<NewsItem[]> | undefined;
export const getAllNews = (): Promise<NewsItem[]> => (newsPromise ??= loadNews());
export const getNews = async (): Promise<NewsItem[]> => (await getAllNews()).slice(0, 3);
