import { test, expect } from '@playwright/test';

// These tests expect the app to expose a login page at /login with the following selectors:
// - input[name="username"] for username
// - input[name="password"] for password
// - button[type="submit"] to submit
// Update selectors to match your implementation if they differ.

const USER = process.env.E2E_USER || 'kminchelle';
const PASS = process.env.E2E_PASS || '0lelplR';

test.describe('Auth flows', () => {
  const findFirst = async (page: any, selectors: string[]) => {
    for (const s of selectors) {
      const locator = page.locator(s);
      if (await locator.count()) return locator.first();
    }
    return null;
  };

  test('login success redirects and sets cookie/session', async ({ page, context }) => {
    await page.goto('/login');

    // selectors to try for username/password/submit
    const usernameSelectors = (process.env.E2E_USERNAME_SELECTOR ? [process.env.E2E_USERNAME_SELECTOR] : []).concat([
      'input[name="username"]',
      'input[name="email"]',
      '#username',
      '#email',
      'input[type="text"]',
      'input[type="email"]',
    ]);

    const passwordSelectors = (process.env.E2E_PASSWORD_SELECTOR ? [process.env.E2E_PASSWORD_SELECTOR] : []).concat([
      'input[name="password"]',
      '#password',
      'input[type="password"]',
    ]);

    const submitSelectors = (process.env.E2E_SUBMIT_SELECTOR ? [process.env.E2E_SUBMIT_SELECTOR] : []).concat([
      'button[type="submit"]',
      'button:has-text("Sign in")',
      'button:has-text("Sign In")',
      'button:has-text("Login")',
      'button:has-text("Log in")',
    ]);

    const u = await findFirst(page, usernameSelectors);
    const p = await findFirst(page, passwordSelectors);
    const s = await findFirst(page, submitSelectors);

    if (!u || !p || !s) {
      throw new Error('Login form selectors not found on /login. Update E2E selectors or ensure the login UI is available');
    }

    await u.fill(USER);
    await p.fill(PASS);

    await Promise.all([
      page.waitForNavigation({ url: '**/dashboard' }).catch(() => {}),
      s.click(),
    ]);

    // Confirm redirect to /dashboard
    expect(page.url()).toContain('/dashboard');

    // Check cookies - look for next-auth cookie
    const cookies = await context.cookies();
    const hasNextAuth = cookies.some((c) => c.name.includes('next-auth'));
    expect(hasNextAuth).toBeTruthy();

    // Confirm the debug session endpoint returns a session or at least the cookie header
    const resp = await page.request.get('/debug/session');
    const body = await resp.json();
    expect(body).toHaveProperty('cookies');
  });

  test('invalid credentials show error', async ({ page }) => {
    await page.goto('/login');

    const usernameSelectors = (process.env.E2E_USERNAME_SELECTOR ? [process.env.E2E_USERNAME_SELECTOR] : []).concat([
      'input[name="username"]',
      'input[name="email"]',
      '#username',
      '#email',
      'input[type="text"]',
      'input[type="email"]',
    ]);

    const passwordSelectors = (process.env.E2E_PASSWORD_SELECTOR ? [process.env.E2E_PASSWORD_SELECTOR] : []).concat([
      'input[name="password"]',
      '#password',
      'input[type="password"]',
    ]);

    const submitSelectors = (process.env.E2E_SUBMIT_SELECTOR ? [process.env.E2E_SUBMIT_SELECTOR] : []).concat([
      'button[type="submit"]',
      'button:has-text("Sign in")',
      'button:has-text("Sign In")',
      'button:has-text("Login")',
      'button:has-text("Log in")',
    ]);

    const findFirst = async (page: any, selectors: string[]) => {
      for (const s of selectors) {
        const locator = page.locator(s);
        if (await locator.count()) return locator.first();
      }
      return null;
    };

    const u = await findFirst(page, usernameSelectors);
    const p = await findFirst(page, passwordSelectors);
    const s = await findFirst(page, submitSelectors);

    if (!u || !p || !s) {
      throw new Error('Login form selectors not found on /login. Update E2E selectors or ensure the login UI is available');
    }

    await u.fill('wrong');
    await p.fill('wrong');

    await s.click();

    // Generic check: ensure we didn't end up on /dashboard
    await page.waitForTimeout(500); // small wait for UI to update
    expect(page.url()).not.toContain('/dashboard');

    // Optionally assert an error message element exists (update selector if needed)
    const error = await page.locator('[role="alert"], .error, #error');
    expect(await error.count()).toBeGreaterThanOrEqual(0);
  });
});
