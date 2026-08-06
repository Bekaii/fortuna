/** Inline SVG icons — replaces lucide-react / react-icons */

const svgAttrs =
  'xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

export const icons = {
  scissors: `<svg ${svgAttrs} class="mx-[1rem] mt-[-10px] w-8 h-8 text-primary"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>`,
  beard: `<svg ${svgAttrs} class="mx-[1rem] mt-[-10px] w-8 h-8 text-primary"><path d="M4.5 3h15"/><path d="M6 3v16a6 6 0 0 0 12 0V3"/><path d="M6 14h12"/></svg>`,
  spray: `<svg ${svgAttrs} class="mx-[1rem] mt-[-10px] w-8 h-8 text-primary"><path d="M3 3h.01"/><path d="M7 5h.01"/><path d="M11 7h.01"/><path d="M3 7h.01"/><path d="M7 9h.01"/><path d="M3 11h.01"/><rect width="4" height="4" x="15" y="5"/><path d="m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2"/><path d="m13 14 8-2"/><path d="m13 19 8-2"/></svg>`,
  phone: `<svg ${svgAttrs} class="w-6 h-6 text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  instagram: `<svg ${svgAttrs} class="w-6 h-6 text-primary"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
  mail: `<svg ${svgAttrs} class="w-6 h-6 text-primary"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  clock: `<svg ${svgAttrs} class="w-6 h-6 text-primary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  mapPin: `<svg ${svgAttrs} class="w-6 h-6 text-primary"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
  sun: `<svg ${svgAttrs} class="h-5 w-5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  moon: `<svg ${svgAttrs} class="h-5 w-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.41 8.59 12 14.17l5.59-5.58L19 10l-7 7-7-7z"/></svg>`,
} as const;

export type ServiceIcon = "Scissors" | "Beard" | "Spray";

export function serviceIcon(name: string): string {
  switch (name) {
    case "Scissors":
      return icons.scissors;
    case "Beard":
      return icons.beard;
    case "Spray":
      return icons.spray;
    default:
      return icons.scissors;
  }
}
