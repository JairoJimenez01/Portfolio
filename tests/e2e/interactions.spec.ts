import { expect, test } from '@playwright/test';
import { BASE_PATH } from '../../playwright.config';

/** Debe coincidir con VISIBLE_SKILLS en components/sections/Skills.astro. */
const VISIBLE_SKILLS = 3;

test.describe('Interacciones', () => {
  test('cada categoría de habilidades muestra tres y despliega el resto', async ({ page }) => {
    await page.goto(BASE_PATH);
    const rows = page.locator('#habilidades [data-expandable]');
    expect(await rows.count()).toBeGreaterThan(0);

    const row = rows.first();
    const chips = row.locator('li.chip');
    const total = await chips.count();
    const toggle = row.getByRole('button');

    await expect(chips.filter({ visible: true })).toHaveCount(VISIBLE_SKILLS);
    // innerText: solo cuenta la etiqueta visible, no la del estado contrario.
    await expect(toggle).toHaveText(`+${total - VISIBLE_SKILLS} más`, { useInnerText: true });
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveText('Ver menos', { useInnerText: true });
    await expect(chips.filter({ visible: true })).toHaveCount(total);
    await toggle.click();
    await expect(chips.filter({ visible: true })).toHaveCount(VISIBLE_SKILLS);
  });

  test('los logros de cada puesto están plegados y se despliegan', async ({ page }) => {
    await page.goto(BASE_PATH);
    const job = page.locator('#experiencia [data-expandable]').first();
    const highlights = job.locator('ul');
    const toggle = job.getByRole('button');

    await expect(highlights).toBeHidden();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(highlights).toBeVisible();
  });

  test('el contacto ofrece correo, copia y enlaces con nombre accesible', async ({ page }) => {
    await page.goto(BASE_PATH);
    const contact = page.locator('#contacto');
    await expect(contact.locator('a[href^="mailto:"]')).toHaveCount(1);
    await expect(contact.getByRole('button', { name: /Copiar/ })).toBeVisible();
    await expect(contact.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      /linkedin\.com/,
    );
    await expect(contact.getByRole('link', { name: 'Malt' })).toHaveAttribute('href', /malt\.es/);
  });

  test('si el JavaScript no carga, todo el contenido queda visible', async ({ page }) => {
    await page.route('**/_astro/*.js', (route) => route.abort());
    await page.goto(BASE_PATH);
    await expect(page.locator('h1')).toHaveCSS('opacity', '1', { timeout: 6000 });

    const chips = page.locator('#habilidades li.chip');
    await expect(chips.filter({ visible: true })).toHaveCount(await chips.count());
    await expect(page.locator('#experiencia [data-collapsible]').first()).toBeVisible();
    await expect(page.locator('[data-expand-toggle]').filter({ visible: true })).toHaveCount(0);
  });
});

test.describe('Presentación según el dispositivo', () => {
  test('en móvil no se muestra ni se descarga la foto, y el texto va centrado', async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, 'Solo en móvil');
    const photoRequests: string[] = [];
    page.on('request', (request) => {
      if (/\/_astro\/foto\./.test(request.url())) photoRequests.push(request.url());
    });
    await page.goto(BASE_PATH);
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('img', { name: /Retrato/ })).toBeHidden();
    expect(photoRequests).toEqual([]);
    await expect(page.locator('h1')).toHaveCSS('text-align', 'center');
    await expect(page.getByRole('link', { name: 'Descargar CV' })).toBeVisible();
  });

  test('en escritorio se muestra la foto', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Solo en escritorio');
    await page.goto(BASE_PATH);
    await expect(page.getByRole('img', { name: /Retrato/ })).toBeVisible();
  });
});
