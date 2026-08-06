import { icons, serviceIcon } from "../src/icons";

export type SiteConfig = {
  siteInfo: {
    name: string;
    description: string;
    longDescription: string;
    logo: { light: string; dark: string };
    copyright: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    googleSiteVerification: string;
    structuredData: Record<string, unknown>;
  };
  contact: {
    phone: string;
    phoneLink: string;
    email: string;
    instagram: string;
    instagramLink: string;
    address: string;
    mapLink: string;
    openingHours: Array<{ days: string; hours: string }>;
  };
  about: {
    title: string;
    paragraphs: string[];
  };
  services: Array<{
    icon: string;
    name: string;
    items: Array<{ name: string; price: string }>;
  }>;
  googleMerchant: {
    storeCode: string;
    storeName: string;
    storeDescription: string;
    websiteUrl: string;
    availability: string;
    condition: string;
    brand: string;
  };
};

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Map public URL paths to files Bun can resolve from src/ */
function publicAsset(urlPath: string): string {
  const relative = urlPath.replace(/^\//, "");
  return `../public/${relative}`;
}

function buildDescription(config: SiteConfig): string {
  const { siteInfo, contact } = config;
  return `${siteInfo.description}

${siteInfo.longDescription}

📍 ${contact.address}
📞 ${contact.phone}
📧 ${contact.email}
📱 Instagram: ${contact.instagram}

⏰ Öppettider:
${contact.openingHours.map((oh) => `${oh.days}: ${oh.hours}`).join("\n")}

Besök vår välkomnande salong där vi kombinerar många års erfarenhet med känsla för detaljer. Drop-in välkomna, tidsbokning rekommenderas.`;
}

export function renderHtml(
  config: SiteConfig,
  galleryImages: string[],
  googleSiteVerification: string,
): string {
  const { siteInfo, seo, contact, about, services } = config;
  const description = buildDescription(config);
  const verification = googleSiteVerification || seo.googleSiteVerification;

  const gallerySlides = galleryImages
    .map((src, index) => {
      const alt = escapeHtml(
        src.split("/").pop()?.replace(/\.[^.]+$/, "") || "Galleri",
      );
      return `
            <div class="flex-shrink-0 w-full justify-center snap-center">
              <div class="aspect-square mx-10 md:mx-auto md:w-1/2 relative rounded-lg overflow-hidden">
                <img
                  src="${publicAsset(src)}"
                  alt="${alt}"
                  width="800"
                  height="800"
                  class="object-cover w-full h-full"
                  ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
                />
              </div>
            </div>`;
    })
    .join("");

  const galleryDots = galleryImages
    .map(
      (_, index) => `
            <button
              type="button"
              data-gallery-dot
              class="gallery-dot w-2.5 h-2.5 rounded-full transition-all ${
                index === 0
                  ? "is-active bg-primary w-5"
                  : "bg-foreground hover:bg-secondary-foreground"
              }"
              aria-label="Gå till bild ${index + 1}"
            ></button>`,
    )
    .join("");

  const serviceCards = services
    .map(
      (service) => `
          <div class="bg-card overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-center mb-4">
                <h3 class="text-xl font-semibold text-center mb-4 text-primary">${escapeHtml(service.name)}</h3>
                ${serviceIcon(service.icon)}
              </div>
              <ul class="space-y-4 text-primary">
                ${service.items
                  .map(
                    (item) => `
                <li class="flex justify-between items-center">
                  <span>${escapeHtml(item.name)}</span>
                  <span class="font-semibold text-foreground">${escapeHtml(item.price)}</span>
                </li>`,
                  )
                  .join("")}
              </ul>
            </div>
          </div>`,
    )
    .join("");

  const hoursHtml = contact.openingHours
    .map(
      (h) =>
        `<p class="text-lg text-primary">${escapeHtml(h.days)}: ${escapeHtml(h.hours)}</p>`,
    )
    .join("");

  const aboutParagraphs = about.paragraphs
    .map(
      (p, index) =>
        `<p class="${index !== about.paragraphs.length - 1 ? "mb-4" : ""}">${escapeHtml(p)}</p>`,
    )
    .join("");

  return `<!doctype html>
<html lang="sv" data-props-for="viewport">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(seo.keywords.join(", "))}" />
    <link rel="icon" href="../public/icon.ico" />
    ${
      verification
        ? `<meta name="google-site-verification" content="${escapeHtml(verification)}" />`
        : ""
    }
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
    <script type="application/ld+json">${JSON.stringify(seo.structuredData)}</script>
    <script>
      (function () {
        try {
          var key = "fortuna-theme";
          var stored = localStorage.getItem(key);
          var dark = stored === "dark" || (stored !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
          if (dark) document.documentElement.classList.add("dark");
        } catch (_) {}
      })();
    </script>
    <link rel="stylesheet" href="./styles.css" />
    <script type="module" src="./app.ts"></script>
  </head>
  <body>
    <div class="min-h-screen bg-background text-foreground">
      <nav class="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 shadow-sm">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between h-16">
            <div class="flex-1"></div>
            <div class="flex space-x-8 text-primary">
              <a href="#hem" data-nav-link class="nav-link text-lg font-medium cursor-pointer hover:text-secondary-foreground transition-colors is-active">Hem</a>
              <a href="#priser" data-nav-link class="nav-link text-lg font-medium cursor-pointer hover:text-secondary-foreground transition-colors">Priser</a>
              <a href="#kontakt" data-nav-link class="nav-link text-lg font-medium cursor-pointer hover:text-secondary-foreground transition-colors">Kontakt</a>
            </div>
            <div class="flex-1 flex justify-end">
              <button type="button" data-theme-toggle class="p-2 rounded-md hover:text-secondary-foreground transition-colors" aria-label="Växla tema">
                <span class="dark:hidden">${icons.moon}</span>
                <span class="hidden dark:inline">${icons.sun}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main class="relative">
        <section class="h-screen flex items-center justify-center relative" data-props-for="visibility">
          <div class="text-center reveal">
            <h1 class="text-4xl font-bold mb-4 text-primary">Välkommen till</h1>
            <img src="${publicAsset(siteInfo.logo.light)}" alt="${escapeHtml(siteInfo.name)} Logo" width="500" height="500" class="logo-light mx-auto max-w-full h-auto" />
            <img src="${publicAsset(siteInfo.logo.dark)}" alt="${escapeHtml(siteInfo.name)} Logo" width="500" height="500" class="logo-dark mx-auto max-w-full h-auto" />
          </div>
          <a href="#hem" class="absolute bottom-32 cursor-pointer animate-bounce text-3xl" aria-label="Scrolla till innehåll">
            <div class="flex flex-col items-center">
              <span>${icons.chevronDown}</span>
              <span class="-mt-4 text-primary">${icons.chevronDown}</span>
            </div>
          </a>
        </section>

        <section id="hem" class="py-16 bg-muted relative scroll-mt-16" data-props-for="visibility">
          <div class="container mx-auto px-4 reveal">
            <div class="mb-16" data-gallery>
              <div class="relative w-full max-w-4xl mx-auto mb-4">
                <div
                  data-gallery-track
                  class="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                >
                  ${gallerySlides}
                </div>
                <div class="flex justify-center mt-4 space-x-2">
                  ${galleryDots}
                </div>
              </div>
            </div>

            <div class="flex flex-col md:flex-row items-center gap-8">
              <div class="flex-1 justify-center items-center">
                <h2 class="text-2xl font-bold mb-4 text-primary">${escapeHtml(about.title)}</h2>
                ${aboutParagraphs}
              </div>
            </div>
          </div>
        </section>

        <section id="priser" class="py-16 relative scroll-mt-16" data-props-for="visibility">
          <div class="container mx-auto px-4 reveal">
            <h2 class="text-3xl font-bold text-center mb-8 text-primary">Priser</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              ${serviceCards}
            </div>
          </div>
        </section>

        <div id="kontakt" class="scroll-mt-16">
          <section class="py-16 bg-muted relative" data-props-for="visibility">
            <div class="container mx-auto px-4 py-16 reveal">
              <h2 class="text-4xl font-bold text-center mb-12 text-primary">Kontakt &amp; Bokning</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="space-y-8">
                  <div class="flex items-center space-x-4 p-4 rounded-xl hover:bg-primary/5 transition-colors">
                    <div class="bg-primary/10 p-4 rounded-full">${icons.phone}</div>
                    <div>
                      <p class="text-sm text-foreground font-medium mb-1">Telefon</p>
                      <a href="sms:${escapeHtml(contact.phoneLink)}" class="text-lg text-primary transition-colors">${escapeHtml(contact.phone)}</a>
                    </div>
                  </div>
                  <div class="flex items-center space-x-4 p-4 rounded-xl hover:bg-primary/5 transition-colors">
                    <div class="bg-primary/10 p-4 rounded-full">${icons.instagram}</div>
                    <div>
                      <p class="text-sm text-foreground font-medium mb-1">Instagram</p>
                      <a href="${escapeHtml(contact.instagramLink)}" target="_blank" rel="noopener noreferrer" class="text-lg text-primary transition-colors">${escapeHtml(contact.instagram)}</a>
                    </div>
                  </div>
                  <div class="flex items-center space-x-4 p-4 rounded-xl hover:bg-primary/5 transition-colors">
                    <div class="bg-primary/10 p-4 rounded-full">${icons.mail}</div>
                    <div>
                      <p class="text-sm text-foreground font-medium mb-1">E-post</p>
                      <a href="mailto:${escapeHtml(contact.email)}" class="text-lg text-primary transition-colors">${escapeHtml(contact.email)}</a>
                    </div>
                  </div>
                </div>
                <div class="space-y-8">
                  <div class="flex items-center space-x-4 p-4 rounded-xl hover:bg-primary/5 transition-colors">
                    <div class="bg-primary/10 p-4 rounded-full">${icons.clock}</div>
                    <div>
                      <p class="text-sm text-foreground font-medium mb-1">Öppettider</p>
                      ${hoursHtml}
                    </div>
                  </div>
                  <div class="flex items-center space-x-4 p-4 rounded-xl hover:bg-primary/5 transition-colors">
                    <div class="bg-primary/10 p-4 rounded-full">${icons.mapPin}</div>
                    <div>
                      <p class="text-sm text-foreground font-medium mb-1">Adress</p>
                      <a href="${escapeHtml(contact.mapLink)}" target="_blank" rel="noopener noreferrer" class="text-lg text-primary transition-colors">${escapeHtml(contact.address)}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer class="bg-muted py-8 text-center">
            <div class="container mx-auto px-4">
              <p>&copy; ${escapeHtml(siteInfo.copyright)}</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  </body>
</html>
`;
}
