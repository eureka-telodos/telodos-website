import { vrEvents as localEvents } from '../data/vr-events';
import { fetchVrEvents, type VrEvent } from './vr-events-client';

const endpoint = (import.meta.env.MICROCMS_EVENTS_ENDPOINT || process.env.MICROCMS_EVENTS_ENDPOINT || '').trim();
const service = (import.meta.env.MICROCMS_EVENTS_SERVICE_DOMAIN || process.env.MICROCMS_EVENTS_SERVICE_DOMAIN || 'etdnews').trim();
const key = import.meta.env.MICROCMS_EVENTS_API_KEY || process.env.MICROCMS_EVENTS_API_KEY ||
  import.meta.env.MICROCMS_API_KEY || process.env.MICROCMS_API_KEY;

export const eventsConfigured = Boolean(endpoint);
let eventsPromise: Promise<VrEvent[]> | undefined;
export const getVrEvents = (): Promise<VrEvent[]> => {
  // Deliberate migration mode: omit endpoint until the CMS records and permissions are ready.
  if (!eventsConfigured) return Promise.resolve([...localEvents]);
  if (!key) return Promise.reject(new Error('microCMS events endpoint is set but its build API key is missing.'));
  return eventsPromise ??= fetchVrEvents(service, endpoint, key);
};
