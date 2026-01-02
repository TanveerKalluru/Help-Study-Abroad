import React from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { renderToString } from 'react-dom/server';
import { useServerInsertedHTML } from 'next/navigation';
import createEmotionCache from '../../lib/createEmotionCache';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  useServerInsertedHTML(() => {
    // Render children to string so emotion can extract the critical CSS
    const html = renderToString(<CacheProvider value={cache}>{children}</CacheProvider>);
    const chunks = extractCriticalToChunks(html);
    const styles = constructStyleTagsFromChunks(chunks);

    // Inject the style tags returned by emotion into the server HTML
    return <div dangerouslySetInnerHTML={{ __html: styles }} />;
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
