import { defineConfig, devices } from '@playwright/test';

const PORT = 4321;

/** Debe coincidir con `base` en astro.config.ts (con barra final). */
export const BASE_PATH = '/Portfolio/';

const origin = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `${origin}${BASE_PATH}`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    // Pixel 7 como base (Chrome Android, táctil) con las medidas de un Pixel 10: 412×924.
    { name: 'mobile', use: { ...devices['Pixel 7'], viewport: { width: 412, height: 924 } } },
  ],
  // Los tests corren contra el build de producción, que es lo que se publica.
  webServer: {
    command: `npm run preview -- --host 127.0.0.1 --port ${PORT}`,
    url: `${origin}${BASE_PATH}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
