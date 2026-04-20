"use client";

import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  { href: "#case-studies", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function OnePageNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [cubeVisible, setCubeVisible] = useState(false);
  const navRef = useRef(null);
  const close = () => setMenuOpen(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setCollapsed(!entry.isIntersecting),
      { threshold: 0.6 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const cube = document.querySelector(".bento-card--blog-cube");
    if (!cube) return;
    const io = new IntersectionObserver(
      ([entry]) => setCubeVisible(entry.isIntersecting),
      { threshold: 0.01, rootMargin: "0px 0px -95% 0px" }
    );
    io.observe(cube);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !collapsed || !cubeVisible) {
      if (nav) nav.style.top = "";
      return;
    }
    const cube = document.querySelector(".bento-card--blog-cube");
    if (!cube) return;

    let raf;
    const update = () => {
      const r = cube.getBoundingClientRect();
      nav.style.top = `${Math.max(0, r.top)}px`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(raf);
      nav.style.top = "";
    };
  }, [collapsed, cubeVisible]);

  return (
    <header ref={navRef} className={`bento-nav${collapsed ? " collapsed" : ""}`}>
      <a href="#hero" className="logo" onClick={close}>
        <img src="/m-key.png" alt="mklenotic" className="logo-img" />
      </a>

      <nav>
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
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
          <a key={item.href} href={item.href} onClick={close}>
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
