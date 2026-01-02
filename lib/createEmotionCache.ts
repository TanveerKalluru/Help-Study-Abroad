import createCache from '@emotion/cache';

// Use a stable key for both server and client
export default function createEmotionCache() {
  return createCache({ key: 'mui', prepend: true });
}
