'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  const fullNav = [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }]

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/95 text-[var(--editable-nav-text)] backdrop-blur-md">
      <nav className="mx-auto flex min-h-[72px] w-full max-w-[var(--editable-container)] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--slot4-accent)] shadow-[0_6px_18px_rgba(20,136,191,0.35)] transition group-hover:scale-105">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-6 w-6 object-contain brightness-0 invert" />
          </span>
          <span className="min-w-0">
            <span className="editable-display block max-w-[220px] truncate text-[1.35rem] font-semibold leading-none tracking-[-0.01em]">{SITE_CONFIG.name}</span>
            <span className="mt-1 hidden max-w-[220px] truncate text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)] sm:block">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <div className="ml-2 hidden items-center gap-1 lg:flex">
          {fullNav.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active ? 'text-[var(--slot4-accent)]' : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-accent-soft)] hover:text-[var(--slot4-accent)]'
                }`}
              >
                {item.label}
                {active ? <span className="absolute inset-x-4 -bottom-px h-[2px] rounded-full bg-[var(--slot4-accent)]" /> : null}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--slot4-muted-text)] transition hover:bg-[var(--slot4-accent-soft)] hover:text-[var(--slot4-accent)]"
            aria-label="Toggle search"
          >
            <Search className="h-5 w-5" />
          </button>

          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-5 py-2.5 text-sm font-bold text-[var(--editable-cta-text)] shadow-[0_6px_18px_rgba(20,136,191,0.32)] transition hover:brightness-110 sm:inline-flex"
              >
                <PlusCircle className="h-4 w-4" /> Create
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden items-center gap-2 px-3 py-2 text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-2 px-3 py-2 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)] sm:inline-flex"
              >
                <LogIn className="h-4 w-4" /> Login
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-5 py-2.5 text-sm font-bold text-[var(--editable-cta-text)] shadow-[0_6px_18px_rgba(20,136,191,0.32)] transition hover:brightness-110 sm:inline-flex"
              >
                <UserPlus className="h-4 w-4" /> Sign up
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {searchOpen ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]">
          <form action="/search" className="mx-auto flex w-full max-w-[var(--editable-container)] items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <Search className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
            <input
              name="q"
              type="search"
              autoFocus
              placeholder="Search stories, visuals, profiles…"
              className="min-w-0 flex-1 bg-transparent text-base font-medium outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
            />
            <button className="inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-accent)] px-5 py-2 text-sm font-bold text-white transition hover:brightness-110">
              Search <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-5 lg:hidden">
          <form action="/search" className="mb-5 flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-2.5">
            <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
            <input name="q" type="search" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
          </form>
          <div className="grid gap-1">
            {[...fullNav, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-semibold transition ${
                    active
                      ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]'
                      : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-panel-bg)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </header>
  )
}
