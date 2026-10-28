import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { BASE_PATH, SITE_URL } from '../../src/config/site';
import { getDictionary } from '../../src/i18n';
import { localize } from '../../src/lib/localize';
import { absoluteUrl, joinBase, localeHomePath, ogImagePath } from '../../src/lib/urls';
import { homeOf, LOCALES } from './paths';

const urlOf = (path: string) => absoluteUrl(SITE_URL, BASE_PATH, path);

/** Perfil tal y como está en el contenido: la fuente de qué CV corresponde a cada idioma. */
const profile = JSON.parse(readFileSync('src/content/profile/main.json', 'utf8')) as {
  cv: { file: unknown };
};

test.describe('Idiomas', () => {
  for (const locale of LOCALES) {
    const t = getDictionary(locale);

    test(`la portada en "${locale}" declara su idioma y enlaza las demás versiones`, async ({
      page,
    }) => {
      await page.goto(homeOf(locale));
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        urlOf(localeHomePath(locale)),
      );
      for (const alternate of LOCALES) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${alternate}"]`),
        ).toHaveAttribute('href', urlOf(localeHomePath(alternate)));
      }
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        urlOf(ogImagePath(locale)),
      );
      await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
    });

    test(`la portada en "${locale}" muestra los textos y las anclas de su idioma`, async ({
      page,
    }) => {
      await page.goto(homeOf(locale));
      await expect(page.locator(`#${t.anchors.skills} h2`)).toHaveText(t.sections.skills.title);
      await expect(page.locator(`#${t.anchors.contact}`)).toHaveCount(1);
      await expect(page.getByRole('link', { name: t.hero.downloadCv })).toHaveCount(1);
    });
  }

  test('cada idioma enlaza su propio CV, que se sirve como PDF', async ({ page, request }) => {
    const served = new Set<string>();
    for (const locale of LOCALES) {
      await page.goto(homeOf(locale));
      const expected = joinBase(BASE_PATH, localize(profile.cv.file, locale) as string);
      const link = page.getByRole('link', { name: getDictionary(locale).hero.downloadCv });
      await expect(link).toHaveAttribute('href', expected);

      const response = await request.get(expected);
      expect(response.status(), expected).toBe(200);
      expect(response.headers()['content-type']).toContain('application/pdf');
      served.add(expected);
    }
    expect(served.size).toBe(LOCALES.length);
  });

  test('en escritorio, el desplegable de idioma abre, marca el actual y lleva a cada idioma', async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, 'En móvil los idiomas están dentro del menú');
    await page.goto(homeOf());
    const trigger = page.getByRole('button', { name: /^Idioma/ });
    const panel = page.locator('#language-panel');

    await expect(panel).toBeHidden();
    await trigger.click();
    await expect(panel).toBeVisible();
    await expect(panel.getByRole('link', { name: 'Español' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();

    await trigger.click();
    await panel.getByRole('link', { name: 'English' }).click();
    await expect(page).toHaveURL(new RegExp(`${homeOf('en')}$`));
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    await page.getByRole('button', { name: /^Language/ }).click();
    await page.locator('#language-panel').getByRole('link', { name: 'Català' }).click();
    await expect(page).toHaveURL(new RegExp(`${homeOf('ca')}$`));
    await expect(page.locator('html')).toHaveAttribute('lang', 'ca');
  });

  test('en móvil, los idiomas están dentro del menú y no en la cabecera', async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, 'Solo en móvil');
    await page.goto(homeOf());
    await expect(page.getByRole('button', { name: /^Idioma/ })).toBeHidden();

    await page.getByRole('button', { name: getDictionary('es').nav.open }).click();
    const languages = page
      .locator('#menu')
      .getByRole('navigation', { name: getDictionary('es').nav.languageLabel });
    await expect(languages.getByRole('link', { name: 'Español' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await languages.getByRole('link', { name: 'Català' }).click();
    await expect(page).toHaveURL(new RegExp(`${homeOf('ca')}$`));
    await expect(page.locator('html')).toHaveAttribute('lang', 'ca');
  });
});
