import { test, expect } from '@playwright/test';

test('home page has emotion SSR styles and no hydration errors', async ({ page }) => {
  const consoleMessages: string[] = [];
  page.on('console', (msg) => {
    const text = msg.text();
    consoleMessages.push(text);
  });

  const resp = await page.goto('/');
  expect(resp?.status()).toBeLessThan(400);

  // Check server HTML has style[data-emotion]
  const styles = await page.locator('head style[data-emotion]').count();
  expect(styles).toBeGreaterThan(0);

  // Wait a moment so client JS can run and possibly log hydration warnings
  await page.waitForTimeout(1000);
  const hasHydrationWarning = consoleMessages.some((m) => /Hydration failed|hydration mismatch/i.test(m));
  expect(hasHydrationWarning).toBeFalsy();
});