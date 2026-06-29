'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="relative overflow-hidden bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[var(--slot4-accent)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#6f4bd0]/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-[var(--editable-container)] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--slot4-accent)] shadow-[0_8px_24px_rgba(20,136,191,0.45)]">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-6 w-6 object-contain brightness-0 invert" />
            </span>
            <span className="editable-display text-2xl font-semibold tracking-[-0.01em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/65">{globalContent.footer?.description || SITE_CONFIG.description}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            <span className="h-2 w-2 rounded-full bg-[var(--slot4-lime)]" /> {globalContent.footer?.tagline || 'Curated discovery'}
          </p>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-bright)]">Discover</h3>
          <div className="mt-5 grid gap-3">
            {[['Home', '/'], ['Search', '/search'], ['About', '/about']].map(([label, href]) => (
              <Link key={href} href={href} className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white">
                {label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--slot4-bright)]">Company</h3>
          <div className="mt-5 grid gap-3">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ...(session ? [['Create', '/create']] : [['Login', '/login'], ['Sign up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-medium text-white/70 transition hover:text-white">{label}</Link>
            ))}
            {session ? <button type="button" onClick={logout} className="text-left text-sm font-medium text-white/70 transition hover:text-white">Logout</button> : null}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center justify-between gap-3 px-4 py-6 text-xs font-medium text-white/55 sm:flex-row sm:px-6 lg:px-8">
          <span>© {year} {SITE_CONFIG.name}. All rights reserved.</span>
          <span className="tracking-[0.1em]">{globalContent.footer?.bottomNote || 'Made for clean discovery.'}</span>
        </div>
      </div>
    </footer>
  )
}
