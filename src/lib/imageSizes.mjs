// Shared by scripts/size-images.mjs (makes the files) and src/lib/imageLoader.js (picks one).
// Above the largest width the original file is used: the photos are already ~1200px web-sized WebP.
export const IMAGE_WIDTHS = [256, 384, 640, 828];
export const SIZED_DIR = '/images/_sized';
