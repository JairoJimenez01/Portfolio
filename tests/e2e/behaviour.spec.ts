import { expect, test } from '@playwright/test';
import { joinBase, ogImagePath } from '../../src/lib/urls';
import { homeOf, LOCALES } from './paths';

test.describe('Comportamiento', () => {
  test('el JavaScript arranca y activa el scroll con inercia', async ({ page }) => {
    await page.goto(homeOf());
    await expect(page.locator('html')).toHaveClass(/\bjs\b/);
    await expect(page.locator('html')).toHaveClass(/\bjs-ready\b/);
    await expect(page.locator('html')).toHaveClass(/\blenis\b/);
  });

  test('el CV, las imágenes de previsualización y los ficheros públicos se sirven', async ({
    request,
  }) => {
    const files = ['cv.pdf', 'favicon.svg', 'robots.txt', ...LOCALES.map(ogImagePath)];
    for (const file of files) {
      const response = await request.get(joinBase(homeOf(), file));
      expect(response.status(), file).toBe(200);
    }
  });

  test('el menú cerrado no se alcanza con el teclado ni lo leen los lectores de pantalla', async ({
    page,
  }) => {
    await page.goto(homeOf());
    await expect(page.locator('#menu')).toBeHidden();
    await expect(page.locator('#menu a').first()).toBeHidden();
  });

  test('el menú móvil abre, navega y cierra', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Solo en móvil: en escritorio la navegación es visible');
    await page.goto(homeOf());
    const open = page.getByRole('button', { name: 'Menú' });
    await open.click();
    await expect(open).toHaveAttribute('aria-expanded', 'true');
    await page.locator('#menu a[href="#contacto"]').click();
    await expect(open).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#contacto')).toBeInViewport({ timeout: 5000 });
  });
});
