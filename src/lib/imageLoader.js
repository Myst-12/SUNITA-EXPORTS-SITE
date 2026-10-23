// Custom next/image loader: serves the pre-made size closest to (and not below) what the browser asks for,
// so Vercel does no image resizing. The sizes are made by scripts/size-images.mjs before each build.
import { IMAGE_WIDTHS, SIZED_DIR } from './imageSizes.mjs';

export default function imageLoader({ src, width }) {
  // Only our own raster photos have pre-made sizes; anything else is served as it is.
  if (!src.startsWith('/images/') || src.startsWith(SIZED_DIR) || !/\.(webp|jpe?g|png)$/i.test(src)) return src;
  const w = IMAGE_WIDTHS.find((x) => x >= width);
  if (!w) return src; // large screens get the original photo
  return `${SIZED_DIR}${src.slice('/images'.length).replace(/\.(webp|jpe?g|png)$/i, '')}-${w}.webp`;
}
