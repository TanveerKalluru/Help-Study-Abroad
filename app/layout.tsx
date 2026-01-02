import React from 'react';
import ThemeProvider from './providers/ThemeProvider';

export const metadata = {
  title: 'Help Study Abroad',
  description: 'Scaffolded Next.js app with MUI and Zustand',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
