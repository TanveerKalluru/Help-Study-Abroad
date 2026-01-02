"use client";

import React from 'react';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import createEmotionCache from '../../lib/createEmotionCache';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  // Create a fresh cache for each render
  const cache = createEmotionCache();

  useServerInsertedHTML(() => {
    // Emotion stores styles on cache.sheet.tags during render; collect them and inject as <style> tags
    const tags: any[] = (cache as any).sheet?.tags ?? [];
    if (!tags.length) return null;

    return (
      <>
        {tags.map((tag, i) => (
          <style
            key={i}
            data-emotion={`${cache.key} ${tag.key ?? i}`}
            dangerouslySetInnerHTML={{ __html: tag.textContent }}
          />
        ))}
      </>
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
