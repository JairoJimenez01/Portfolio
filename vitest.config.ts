import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Los tests unitarios cubren módulos de TypeScript puro (src/lib, src/i18n),
// así que no hace falta cargar la configuración de Astro. Solo se replica el alias "@/".
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    include: ['tests/unit/**/*.test.ts'],
  },
});
