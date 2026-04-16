"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { href: "#case-studies", label: "Case studies" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
  { href: "https://mklenotic.com", label: "Site", external: true },
];

export default function OnePageNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <header className="bento-nav">
      <a href="#hero" className="logo" onClick={close}>
        mklenotic
      </a>

      <nav>
        {NAV_ITEMS.map((item) =>
          item.external ? (
            <a
              key={item.href}
              href={item.href}
              className="external"
              target="_blank"
              rel="noreferrer"
            >
              <span>{item.label}</span>
              <svg viewBox="0 0 9 9" fill="none" aria-hidden>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.1894 1.75H1.50006V0.25H8.75006V7.5H7.25006V2.81066L2.03039 8.03033L0.969727 6.96967L6.1894 1.75Z"
                  fill="currentColor"
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
        type="button"
        className={`mobile-toggle${menuOpen ? " open" : ""}`}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span />
        <span />
      </button>

      <div id="mobile-menu" className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            onClick={close}
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
