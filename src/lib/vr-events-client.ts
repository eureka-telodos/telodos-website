export type VrEvent = {
  name: string; description: string; href: string; logo: string; width: number; height: number;
};

const webUrl = (value: unknown, httpsOnly = false): string => {
  if (typeof value !== 'string') throw new Error('VR event URL is missing.');
  const url = new URL(value.trim());
  if (!(httpsOnly ? url.protocol === 'https:' : ['http:', 'https:'].includes(url.protocol)) || url.username || url.password) {
    throw new Error('VR event URL must use HTTP(S) without credentials.');
  }
  return url.href;
};

export async function fetchVrEvents(
  service: string, endpoint: string, apiKey: string, request: typeof fetch = fetch,
): Promise<VrEvent[]> {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(service) || !/^[a-zA-Z0-9_-]+$/.test(endpoint)) {
    throw new Error('Invalid microCMS events service domain or endpoint.');
  }
  if (!apiKey.trim()) throw new Error('microCMS events API key is missing.');
  const url = new URL(`https://${service}.microcms.io/api/v1/${endpoint}`);
  url.searchParams.set('limit', '100');
  url.searchParams.set('orders', 'createdAt');
  const events: VrEvent[] = [];
  let offset = 0;
  let total = 0;
  do {
    url.searchParams.set('offset', String(offset));
    const response = await request(url, {
      headers: { 'X-MICROCMS-API-KEY': apiKey },
      signal: AbortSignal.timeout(15000),
      redirect: 'error',
    });
    if (!response.ok) throw new Error(`microCMS events request failed (HTTP ${response.status}).`);
    const data = await response.json();
    if (!Array.isArray(data.contents) || !Number.isInteger(data.totalCount) || data.totalCount < 0) {
      throw new Error('Invalid microCMS events list response.');
    }
    total = data.totalCount;
    if (!data.contents.length && offset < total) throw new Error('Incomplete microCMS events response.');
    for (const item of data.contents) {
      const banner = item?.['event-banner'];
      const name = item?.['event-name'];
      const info = item?.['event-info'];
      if (typeof name !== 'string' || !name.trim() ||
          (info != null && typeof info !== 'string') ||
          !Number.isInteger(banner?.width) || banner.width <= 0 ||
          !Number.isInteger(banner?.height) || banner.height <= 0) {
        throw new Error('Invalid microCMS event name, description or banner dimensions.');
      }
      events.push({
        name: name.trim(), description: info?.trim() ?? '',
        href: webUrl(item['event-link']), logo: webUrl(banner.url, true),
        width: banner.width, height: banner.height,
      });
    }
    offset += data.contents.length;
  } while (offset < total);
  return events;
}
