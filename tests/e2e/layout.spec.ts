import { expect, test } from '@playwright/test';
import { BASE_PATH } from '../../src/config/site';

/** Anchos representativos: móviles (360, 390 y 412 de un Pixel 10), tableta, portátil y escritorio. */
const WIDTHS = [360, 390, 412, 768, 1024, 1440];

test.describe('Maquetación', () => {
  for (const width of WIDTHS) {
    test(`no hay desplazamiento horizontal a ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(BASE_PATH);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });
  }

  test('todas las secciones del menú existen en la página', async ({ page }) => {
    await page.goto(BASE_PATH);
    const targets = await page
      .locator('nav a[href^="#"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    expect(targets.length).toBeGreaterThan(0);
    for (const target of new Set(targets)) {
      await expect(page.locator(target as string)).toHaveCount(1);
    }
  });

  test('el contenido es visible sin esperar al scroll', async ({ page }) => {
    await page.goto(BASE_PATH);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toHaveCSS('opacity', '1');
  });
});
