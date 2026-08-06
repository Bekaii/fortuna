import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import tailwind from "bun-plugin-tailwind";
import { listGalleryImages } from "./generate-image-list";
import { generateMerchantFeed } from "./generate-merchant-feed";
import { renderHtml, type SiteConfig } from "./render-html";

const root = join(import.meta.dir, "..");
const srcDir = join(root, "src");
const distDir = join(root, "dist");
const publicDir = join(root, "public");
const isDev = process.argv.includes("--dev");

async function copyStaticExtras() {
  await mkdir(distDir, { recursive: true });
  await Bun.write(join(distDir, ".nojekyll"), "");

  const cnameSrc = join(publicDir, "CNAME");
  if (await Bun.file(cnameSrc).exists()) {
    await cp(cnameSrc, join(distDir, "CNAME"));
  } else {
    await Bun.write(join(distDir, "CNAME"), "fortunasalong.se\n");
  }

  const feedSrc = join(publicDir, "merchant-feed.xml");
  if (await Bun.file(feedSrc).exists()) {
    await cp(feedSrc, join(distDir, "merchant-feed.xml"));
  }
}

async function main() {
  const config = (await Bun.file(join(root, "config.json")).json()) as SiteConfig;
  const galleryImages = await listGalleryImages();
  const verification =
    process.env.PUBLIC_GOOGLE_SITE_VERIFICATION ||
    process.env.GOOGLE_SITE_VERIFICATION ||
    "";

  await generateMerchantFeed(config);
  const html = renderHtml(config, galleryImages, verification);
  await Bun.write(join(srcDir, "index.html"), html);
  console.log(`Wrote ${join(srcDir, "index.html")} (${galleryImages.length} gallery images)`);

  if (isDev) {
    console.log("Dev mode: HTML generated. Run `bun ./src/index.html` to serve.");
    return;
  }

  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  const result = await Bun.build({
    entrypoints: [join(srcDir, "index.html")],
    outdir: distDir,
    minify: true,
    plugins: [tailwind],
    env: "PUBLIC_*",
  });

  if (!result.success) {
    console.error("Bun.build failed:");
    for (const log of result.logs) console.error(log);
    process.exit(1);
  }

  await copyStaticExtras();
  console.log(`Build complete → ${distDir}`);
}

await main();
