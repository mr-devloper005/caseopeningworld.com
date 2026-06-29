import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Layers, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

// Brand palette in use across the site. Solid badges rotate through all four
// colors; lime gets dark ink for legibility, the rest get white.
const brandBadges = [
  { bg: 'var(--slot4-bright)', on: '#ffffff' }, // cyan  #39B1D1
  { bg: 'var(--slot4-amber)', on: '#ffffff' },  // amber #F6850C
  { bg: 'var(--slot4-coral)', on: '#ffffff' },  // coral #DE3E3E
  { bg: 'var(--slot4-lime)', on: '#0f1d2e' },   // lime  #D6FB61
]
// Readable-on-white text accents (lime excluded — too light for text).
const brandTextAccents = ['var(--slot4-bright)', 'var(--slot4-amber)', 'var(--slot4-coral)']

function hashKey(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}
function badgeTint(key: string) {
  return brandBadges[hashKey(key || 'x') % brandBadges.length]
}
function textTint(key: string) {
  return brandTextAccents[hashKey(key || 'x') % brandTextAccents.length]
}

// Latest posts' real images (newest first, deduped, placeholders dropped).
function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

// Merge the primary feed with the time-window feeds so home always has content,
// even when one source comes back empty for this site.
function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

/* =============================== HERO ================================== */
export function EditableHomeHero({ posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Discover the best of ${SITE_CONFIG.name}`

  const distinctCategories = new Set(pool.map((post) => categoryOf(post)).filter(Boolean))
  const stats = [
    { value: `${Math.max(pool.length, 1)}+`, label: 'Curated posts' },
    { value: `${Math.max(distinctCategories.size, 1)}`, label: 'Topics covered' },
    { value: `${Math.max(heroImages.length, 1)}`, label: 'Fresh visuals' },
    { value: 'Daily', label: 'New updates' },
  ]

  return (
    <section className="relative overflow-hidden text-white" style={{ backgroundImage: 'var(--slot4-hero-gradient)' }}>
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-[var(--slot4-bright)]/30 blur-3xl" />

      <div className={`relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28 ${container}`}>
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[var(--slot4-lime)]" /> {pagesContent.home.hero.badge || 'Welcome'}
          </span>
          <h1 className="editable-display mt-6 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-[3.6rem]">
            {heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{pagesContent.home.hero.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/search" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[var(--slot4-page-text)] shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]">
              Start exploring <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/15">
              How it works
            </Link>
          </div>

          <form action="/search" className="mt-9 flex w-full max-w-xl overflow-hidden rounded-full bg-white p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.3)]">
            <div className="flex flex-1 items-center gap-2.5 px-4">
              <Search className="h-5 w-5 shrink-0 text-[var(--slot4-muted-text)]" />
              <input
                name="q"
                placeholder={pagesContent.home.hero.searchPlaceholder || 'Search stories, visuals, topics…'}
                className="w-full bg-transparent py-3 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
              />
            </div>
            <button className="shrink-0 rounded-full bg-[var(--slot4-accent)] px-7 text-sm font-bold text-white transition hover:brightness-110">
              Search
            </button>
          </form>
        </div>

        {/* Floating media panel showing latest covers */}
        <div className="relative hidden lg:block">
          <div className="absolute -inset-4 rounded-[2rem] bg-white/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <div className="relative h-[420px] overflow-hidden rounded-[1.25rem]">
              <EditableHeroCollage images={heroImages} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(7,16,28,0.55))]" />
              {heroImages.length ? (
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--slot4-page-text)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--slot4-coral)]" /> Latest on {SITE_CONFIG.name}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Stats band */}
      <div className="relative border-t border-white/10 bg-black/15">
        <div className={`grid grid-cols-2 gap-y-8 py-9 lg:grid-cols-4 ${container}`}>
          {stats.map((stat, index) => {
            const colors = ['var(--slot4-bright)', 'var(--slot4-lime)', 'var(--slot4-amber)', 'var(--slot4-coral)']
            const color = colors[index % colors.length]
            return (
              <div key={stat.label} className={`px-2 ${index !== 0 ? 'lg:border-l lg:border-white/12 lg:pl-8' : ''}`}>
                <span className="block h-1 w-9 rounded-full" style={{ backgroundColor: color }} />
                <p className="editable-display mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl" style={{ color }}>{stat.value}</p>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ===================================================================== */
// Intentionally retained as a no-op export for backwards compatibility.
// The "browse by collection" block was removed from the homepage so the site
// surfaces no standalone links to the section archive index pages.
export function EditableStoryRail(_props: HomeSectionProps) {
  return null
}

/* ===================== FEATURED + EDITORIAL SPLIT ====================== */
function FeaturedCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)
  const tint = badgeTint(post.slug || category || post.title)
  return (
    <Link href={href} className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[1.5rem] border border-[var(--editable-border)] lg:min-h-full">
      <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,28,0.05)_30%,rgba(7,16,28,0.9))]" />
      <div className="relative z-10 p-7 sm:p-9 text-white">
        <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ backgroundColor: tint.bg, color: tint.on }}>
          {category || 'Featured'}
        </span>
        <h3 className="editable-display mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl">{post.title}</h3>
        <p className="mt-3 max-w-lg text-sm leading-7 text-white/80">{getExcerpt(post, 160)}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
          Read feature <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

function HorizontalCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post)
  return (
    <Link href={href} className="group grid grid-cols-[112px_minmax(0,1fr)] gap-4 overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-3 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(15,29,46,0.1)] sm:grid-cols-[140px_minmax(0,1fr)]">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]" loading="lazy" />
      </div>
      <div className="flex min-w-0 flex-col justify-center py-1 pr-2">
        {category ? <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: textTint(category) }}>{category}</p> : null}
        <h3 className="editable-display mt-1.5 line-clamp-2 text-lg font-semibold leading-snug tracking-[-0.01em] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  if (!pool.length) return null
  const [feature, ...rest] = pool
  const side = rest.slice(0, 4)

  return (
    <section className="bg-[var(--slot4-warm)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Editor’s picks</p>
            <h2 className="editable-display mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Featured this week</h2>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <FeaturedCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} />
          <div className="grid gap-4">
            {side.length
              ? side.map((post) => <HorizontalCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)
              : null}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===================== TIME-BASED DISCOVERY GRIDS ===================== */
function ImageFirstCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  const tint = badgeTint(post.slug || category || post.title)
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,29,46,0.12)]"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" loading="lazy" />
        {category ? (
          <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold shadow-sm" style={{ backgroundColor: tint.bg, color: tint.on }}>{category}</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="editable-display line-clamp-2 text-lg font-semibold leading-snug tracking-[-0.01em] group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 110)}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--slot4-accent)]">
          Read more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

function EditorialRow({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const category = categoryOf(post)
  const accent = textTint(post.slug || category || String(index))
  return (
    <Link href={href} className="group flex items-start gap-5 border-b border-[var(--editable-border)] py-5 last:border-b-0">
      <span className="editable-display shrink-0 text-3xl font-semibold leading-none transition" style={{ color: accent }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        {category ? <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>{category}</p> : null}
        <h3 className="editable-display mt-1 line-clamp-2 text-lg font-semibold leading-snug tracking-[-0.01em] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-1.5 line-clamp-1 text-sm text-[var(--slot4-muted-text)]">{getExcerpt(post, 90)}</p>
      </div>
      <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 text-[var(--slot4-soft-muted-text)] transition group-hover:text-[var(--slot4-accent)]" />
    </Link>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'New in the last 7 days' },
  browse: { eyebrow: 'Trending now', title: 'Popular this month' },
  index: { eyebrow: 'Evergreen', title: 'From the archive' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        const asList = index % 2 === 1 // alternate between image grid and editorial list
        return (
          <section key={section.key} className={index % 2 === 0 ? 'bg-[var(--slot4-surface-bg)]' : 'bg-[var(--slot4-warm)]'}>
            <div className={`py-16 sm:py-20 ${container}`}>
              <div className="flex flex-col gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                <h2 className="editable-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">{copy.title}</h2>
              </div>

              {asList ? (
                <div className="mt-8 grid gap-x-12 lg:grid-cols-2">
                  {section.posts.slice(0, 8).map((post, postIndex) => (
                    <EditorialRow key={post.id || post.slug} post={post} index={postIndex} href={postHref(primaryTask, post, primaryRoute)} />
                  ))}
                </div>
              ) : (
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {section.posts.slice(0, 8).map((post) => (
                    <ImageFirstCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )
      })}
    </>
  )
}

/* ================================ CTA ================================= */
export function EditableHomeCta() {
  return (
    <section id="get-app" className="scroll-mt-24 bg-[var(--slot4-surface-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <div className="relative overflow-hidden rounded-[2rem] px-8 py-14 text-center text-white sm:px-16 sm:py-20" style={{ backgroundImage: 'var(--slot4-hero-gradient)' }}>
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-[var(--slot4-lime)]/20 blur-3xl" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/85">
              <Layers className="h-3.5 w-3.5 text-[var(--slot4-lime)]" /> Join the community
            </span>
            <h2 className="editable-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              Got something worth sharing?
            </h2>
            <p className="max-w-xl text-base text-white/80 sm:text-lg">
              Publish a post, share a visual, or build your profile — and reach the {SITE_CONFIG.name} community.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[var(--slot4-page-text)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.3)]">
                Create a post <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
