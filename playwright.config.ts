import { defineConfig, devices } from '@playwright/test';
import { BASE_PATH } from './src/config/site';

const PORT = 4321;
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
    // En CI se usa el Google Chrome que ya traen las máquinas de GitHub: no hay que descargar
    // navegador ni instalar librerías del sistema. En local, el Chromium que instala Playwright.
    channel: process.env.CI ? 'chrome' : undefined,
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
