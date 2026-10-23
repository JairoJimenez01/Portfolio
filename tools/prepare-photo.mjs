/**
 * Prepara la foto de la presentación a partir del original de cámara.
 *
 *   npm run photo                       → lee ./Foto.JPG y escribe ./src/assets/foto.jpg
 *   npm run photo -- origen.jpg destino.jpg
 *
 * - Aplica la orientación EXIF y la descarta (los navegadores no siempre la respetan).
 * - Recorta a 4:5 conservando la parte superior (la cara), y reduce a 1200×1500.
 * - Elimina todos los metadatos: modelo de cámara, fecha y localización no deben publicarse.
 */
import { stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 1500;
const QUALITY = 82;

const [, , inputArg = 'Foto.JPG', outputArg = 'src/assets/foto.jpg'] = process.argv;
const input = resolve(inputArg);
const output = resolve(outputArg);

await sharp(input)
  .rotate()
  .resize({ width: WIDTH, height: HEIGHT, fit: 'cover', position: 'top' })
  .jpeg({ quality: QUALITY, mozjpeg: true })
  .toFile(output);

const { size: inputSize } = await stat(input);
const { size: outputSize } = await stat(output);
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

console.info(
  `Foto preparada: ${output} (${WIDTH}×${HEIGHT}, ${kb(inputSize)} → ${kb(outputSize)})`,
);
