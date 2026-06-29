import type { CSSProperties } from 'react'

export const editableRootStyle = {
  // Clean editorial-magazine system inspired by a connected-platform look:
  // crisp white surfaces, a deep-navy ink, a confident cyan primary, and a
  // small family of bright accents (lime / amber / coral) used sparingly to
  // give cards and chips variety. A navy→blue→violet gradient powers dark
  // hero and call-to-action bands.
  '--slot4-page-bg': '#ffffff',
  '--slot4-page-text': '#0f1d2e',
  '--slot4-panel-bg': '#f3f7fb',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#51627a',
  '--slot4-soft-muted-text': '#8593a8',
  // Brand palette (exact): cyan #39B1D1, lime #D6FB61, amber #F6850C, coral #DE3E3E.
  '--slot4-accent': '#39b1d1',
  '--slot4-accent-fill': '#39b1d1',
  '--slot4-accent-soft': '#e7f6fb',
  '--slot4-on-accent': '#ffffff',
  // Secondary brand accents — used for badges / chips variety.
  '--slot4-bright': '#39b1d1',
  '--slot4-lime': '#d6fb61',
  '--slot4-amber': '#f6850c',
  '--slot4-coral': '#de3e3e',
  '--slot4-dark-bg': '#0c1626',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#e7eef6',
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#f3f7fb',
  '--slot4-lavender': '#f6f9fc',
  '--slot4-gray': '#f3f7fb',
  '--slot4-body-gradient': 'none',
  // Signature dark gradient used by the hero + CTA bands (navy → brand cyan).
  '--slot4-hero-gradient':
    'linear-gradient(118deg, #0a1422 0%, #103a5e 40%, #1f7fae 70%, #39b1d1 100%)',
  '--editable-page-bg': '#ffffff',
  '--editable-page-text': '#0f1d2e',
  '--editable-container': '1240px',
  '--editable-border': '#e2e8f1',
  '--editable-nav-bg': '#ffffff',
  '--editable-nav-text': '#0f1d2e',
  '--editable-nav-active': '#39b1d1',
  '--editable-nav-active-text': '#ffffff',
  '--editable-cta-bg': '#39b1d1',
  '--editable-cta-text': '#ffffff',
  '--editable-search-bg': '#ffffff',
  '--editable-footer-bg': '#0c1626',
  '--editable-footer-text': '#ffffff',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_1px_3px_rgba(0,0,0,0.08)]',
  shadowStrong: 'shadow-[0_4px_18px_rgba(0,0,0,0.12)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.72))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[140px] shrink-0 snap-start sm:w-[160px]',
  },
  type: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]',
    heroTitle: 'text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.02em] sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-2xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-2xl border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-2xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3 text-sm font-bold tracking-[0.01em] text-[var(--slot4-on-accent)] transition duration-200 hover:brightness-110 active:scale-[0.98]`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-7 py-3 text-sm font-bold tracking-[0.01em] text-[var(--slot4-page-text)] transition duration-200 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] active:scale-[0.98]`,
    accent: `inline-flex items-center justify-center gap-2 rounded-full ${editablePalette.accentBg} px-7 py-3 text-sm font-bold text-[var(--slot4-on-accent)] transition duration-200 hover:brightness-110 active:scale-[0.98]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-2xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.14)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing, like the MysteryCoder reference layout.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
