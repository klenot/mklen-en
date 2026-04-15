"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { href: "#case-studies", label: "Case studies" },
  { href: "#process", label: "Process" },
  { href: "#clients", label: "Clients" },
  { href: "https://mklenotic.com", label: "Site", external: true },
  { href: "#contact", label: "Contact" },
];

export default function OnePageNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <header className='page-header'>
      <div className='arch-container'>
        <div className='arch-grid'>
          <a href='#hero' className='arch-logo' onClick={close}>
            mklenotic
          </a>

          <nav className='arch-nav' aria-label='Primary'>
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  className='arch-external'
                  target='_blank'
                  rel='noreferrer'
                >
                  <span>{item.label}</span>
                  <svg viewBox='0 0 9 9' fill='none' aria-hidden>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M6.1894 1.75H1.50006V0.25H8.75006V7.5H7.25006V2.81066L2.03039 8.03033L0.969727 6.96967L6.1894 1.75Z'
                      fill='currentColor'
                    />
                  </svg>
                </a>
              ) : (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              )
            )}
          </nav>

          <button
            type='button'
            className={`mobile-menu-btn${menuOpen ? " arch-open" : ""}`}
            aria-expanded={menuOpen}
            aria-controls='arch-mobile-menu'
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
          </button>

          <div
            id='arch-mobile-menu'
            className={`mobile-menu${menuOpen ? " arch-open" : ""}`}
          >
            <div className='inner'>
              {NAV_ITEMS.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className='menu-link'
                    target='_blank'
                    rel='noreferrer'
                    onClick={close}
                  >
                    {item.label}
                    <svg viewBox='0 0 9 9' fill='none' aria-hidden>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M6.1894 1.75H1.50006V0.25H8.75006V7.5H7.25006V2.81066L2.03039 8.03033L0.969727 6.96967L6.1894 1.75Z'
                        fill='currentColor'
                      />
                    </svg>
                  </a>
                ) : (
                  <a key={item.href} href={item.href} className='menu-link' onClick={close}>
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
