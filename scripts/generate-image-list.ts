import { readdir } from "node:fs/promises";
import { join } from "node:path";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export async function listGalleryImages(
  imgsDir = join(import.meta.dir, "../public/imgs"),
): Promise<string[]> {
  const files = await readdir(imgsDir);
  return files
    .filter((file) => {
      const ext = file.slice(file.lastIndexOf(".")).toLowerCase();
      return IMAGE_EXTS.has(ext);
    })
    .sort()
    .map((file) => `/imgs/${file}`);
}

if (import.meta.main) {
  const images = await listGalleryImages();
  console.log(`Found ${images.length} gallery images`);
  for (const image of images) console.log(`  ${image}`);
}
