"use client";

import React from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../../lib/createEmotionCache';

// Create a client-side cache that will persist for the lifecycle of the app
const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </CacheProvider>
  );
}
