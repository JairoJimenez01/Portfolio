import { expect, test } from '@playwright/test';
import { BASE_PATH } from '../../src/config/site';

test.describe('Comportamiento', () => {
  test('el JavaScript arranca y activa el scroll con inercia', async ({ page }) => {
    await page.goto(BASE_PATH);
    await expect(page.locator('html')).toHaveClass(/\bjs\b/);
    await expect(page.locator('html')).toHaveClass(/\bjs-ready\b/);
    await expect(page.locator('html')).toHaveClass(/\blenis\b/);
  });

  test('el CV y la imagen de previsualización se sirven', async ({ request }) => {
    for (const file of ['cv.pdf', 'og.png', 'favicon.svg', 'robots.txt']) {
      const response = await request.get(`${BASE_PATH}${file}`);
      expect(response.status(), file).toBe(200);
    }
  });

  test('la página declara metadatos para previsualizar el enlace', async ({ page }) => {
    await page.goto(BASE_PATH);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og\.png$/);
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  });

  test('el menú cerrado no se alcanza con el teclado ni lo leen los lectores de pantalla', async ({
    page,
  }) => {
    await page.goto(BASE_PATH);
    await expect(page.locator('#menu')).toBeHidden();
    await expect(page.locator('#menu a').first()).toBeHidden();
  });

  test('el menú móvil abre, navega y cierra', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Solo en móvil: en escritorio la navegación es visible');
    await page.goto(BASE_PATH);
    const open = page.getByRole('button', { name: 'Menú' });
    await open.click();
    await expect(open).toHaveAttribute('aria-expanded', 'true');
    await page.locator('#menu a[href="#contacto"]').click();
    await expect(open).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#contacto')).toBeInViewport({ timeout: 5000 });
  });
});
