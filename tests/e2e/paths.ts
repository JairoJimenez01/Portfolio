import { DEFAULT_LOCALE, LOCALES, type Locale } from '../../src/config/locales';
import { BASE_PATH } from '../../src/config/site';
import { joinBase, localeHomePath } from '../../src/lib/urls';

export { DEFAULT_LOCALE, LOCALES, type Locale };

/** Portada de un idioma tal y como la sirve el build: "/", "/en/", "/ca/". */
export function homeOf(locale: Locale = DEFAULT_LOCALE): string {
  return joinBase(BASE_PATH, localeHomePath(locale));
}
