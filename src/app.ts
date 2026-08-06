import "prop-for-that/auto";

const THEME_KEY = "fortuna-theme";

function getPreferredTheme(): "dark" | "light" {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: "dark" | "light") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  applyTheme(getPreferredTheme());

  const button = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
  if (!button) return;

  button.addEventListener("click", () => {
    const next = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    applyTheme(next);
  });
}

function initNav() {
  const links = [
    ...document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"),
  ];
  const sections = ["hem", "priser", "kontakt"]
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);

  if (links.length === 0 || sections.length === 0) return;

  const setActive = (id: string) => {
    for (const link of links) {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    }
  };

  const onScroll = () => {
    const mid = window.scrollY + window.innerHeight / 2;
    const nearBottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 100;

    if (nearBottom) {
      setActive("kontakt");
      return;
    }

    let active = sections[0]?.id ?? "hem";
    for (const section of [...sections].reverse()) {
      const top = section.getBoundingClientRect().top + window.scrollY;
      if (mid >= top) {
        active = section.id;
        break;
      }
    }
    setActive(active);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initGallery() {
  const root = document.querySelector<HTMLElement>("[data-gallery]");
  const track = root?.querySelector<HTMLElement>("[data-gallery-track]");
  const dots = [
    ...(root?.querySelectorAll<HTMLButtonElement>("[data-gallery-dot]") ?? []),
  ];

  if (!root || !track || dots.length === 0) return;

  let currentIndex = 0;
  let hovering = false;

  const scrollToImage = (index: number) => {
    const clamped = Math.min(Math.max(index, 0), dots.length - 1);
    const itemWidth = track.clientWidth;
    track.scrollTo({ left: clamped * itemWidth, behavior: "smooth" });
    currentIndex = clamped;
    for (const [i, dot] of dots.entries()) {
      dot.classList.toggle("is-active", i === clamped);
    }
  };

  track.addEventListener(
    "scroll",
    () => {
      const itemWidth = track.clientWidth;
      if (itemWidth === 0) return;
      const next = Math.round(track.scrollLeft / itemWidth);
      if (next !== currentIndex && next >= 0 && next < dots.length) {
        currentIndex = next;
        for (const [i, dot] of dots.entries()) {
          dot.classList.toggle("is-active", i === next);
        }
      }
    },
    { passive: true },
  );

  for (const [i, dot] of dots.entries()) {
    dot.addEventListener("click", () => scrollToImage(i));
  }

  root.addEventListener("mouseenter", () => {
    hovering = true;
  });
  root.addEventListener("mouseleave", () => {
    hovering = false;
  });

  root.addEventListener(
    "wheel",
    (event) => {
      if (!hovering) return;
      event.preventDefault();
      const direction = event.deltaY > 0 ? 1 : -1;
      scrollToImage(currentIndex + direction);
    },
    { passive: false },
  );
}

initTheme();
initNav();
initGallery();
