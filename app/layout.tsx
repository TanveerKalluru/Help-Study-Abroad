import React from 'react';
import ThemeProvider from './providers/ThemeProvider';
import ThemeRegistry from './providers/ThemeRegistry';

export const metadata = {
  title: 'Help Study Abroad',
  description: 'Scaffolded Next.js app with MUI and Zustand',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* ThemeRegistry runs on the server and injects Emotion critical CSS into the HTML */}
        <ThemeRegistry>
          {/* ThemeProvider is a client component that sets the MUI theme and client Emotion cache */}
          <ThemeProvider>{children}</ThemeProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
