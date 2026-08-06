import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import type { SiteConfig } from "./render-html";

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Parse display prices like "300kr", "100 kr", "Från 400kr" into SEK amounts. */
export function parsePriceSek(price: string): number | null {
  const match = price.replace(/\s/g, "").match(/(\d+(?:[.,]\d+)?)/);
  if (!match?.[1]) return null;
  return Number(match[1].replace(",", "."));
}

function escapeXml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export type MerchantProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  imageLink: string;
  link: string;
};

export function productsFromServices(config: SiteConfig): MerchantProduct[] {
  const { services, siteInfo, googleMerchant } = config;
  const baseUrl = googleMerchant.websiteUrl.replace(/\/$/, "");
  const imageLink = `${baseUrl}${siteInfo.logo.light.startsWith("/") ? "" : "/"}${siteInfo.logo.light}`;
  const link = `${baseUrl}/#priser`;
  const products: MerchantProduct[] = [];
  const seenIds = new Set<string>();

  for (const category of services) {
    for (const item of category.items) {
      const price = parsePriceSek(item.price);
      if (price === null) {
        console.warn(`Skipping merchant item with unparseable price: ${item.name} (${item.price})`);
        continue;
      }

      let id = slugify(item.name);
      if (seenIds.has(id)) {
        id = `${slugify(category.name)}-${id}`;
      }
      seenIds.add(id);

      products.push({
        id,
        title: item.name,
        description: `${item.name} hos ${googleMerchant.storeName}. Kategori: ${category.name}.`,
        price,
        currency: "SEK",
        imageLink,
        link,
      });
    }
  }

  return products;
}

export async function generateMerchantFeed(
  config: SiteConfig,
  outputPath = join(import.meta.dir, "../public/merchant-feed.xml"),
): Promise<void> {
  const { googleMerchant } = config;
  const products = productsFromServices(config);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${escapeXml(googleMerchant.storeName)}</title>
    <link>${escapeXml(googleMerchant.websiteUrl)}</link>
    <description>${escapeXml(googleMerchant.storeDescription)}</description>
`;

  for (const product of products) {
    xml += `    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <g:title>${escapeXml(product.title)}</g:title>
      <g:description>${escapeXml(product.description)}</g:description>
      <g:link>${escapeXml(product.link)}</g:link>
      <g:image_link>${escapeXml(product.imageLink)}</g:image_link>
      <g:availability>${escapeXml(googleMerchant.availability)}</g:availability>
      <g:price>${product.price} ${product.currency}</g:price>
      <g:brand>${escapeXml(googleMerchant.brand)}</g:brand>
      <g:condition>${escapeXml(googleMerchant.condition)}</g:condition>
    </item>
`;
  }

  xml += `  </channel>
</rss>`;

  await mkdir(join(outputPath, ".."), { recursive: true });
  await Bun.write(outputPath, xml);
  console.log(
    `Google Merchant feed written to ${outputPath} (${products.length} products from services)`,
  );
}

if (import.meta.main) {
  const config = (await Bun.file(
    join(import.meta.dir, "../config.json"),
  ).json()) as SiteConfig;
  await generateMerchantFeed(config);
}
