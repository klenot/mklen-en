"use client";

import { useEffect, useRef, useState } from "react";
import OnePageNav from "app/components/Homepage/one-page-nav";
import OnePageFooter from "app/components/Homepage/one-page-footer";

const HERO_PREVIEW =
  "https://arch.agency/wp-content/uploads/2024/09/Reel-2024-Preview-V1-resized.mp4";
const HERO_FULL =
  "https://arch.agency/wp-content/uploads/2024/09/Arch.-Influencer-Agency-2024-Reel-Web-resized.mp4";

const PROJECTS = [
  {
    title: "Wargaming",
    poster: "https://arch.agency/wp-content/uploads/2024/09/WoT-featured.jpeg",
    video: "https://arch.agency/wp-content/uploads/2024/09/WG-preview.mp4",
    stats: [
      { num: "550", label: "influencers" },
      { num: "1,500", label: "activations" },
      { num: "30", label: "countries" },
    ],
  },
  {
    title: "Dice Dreams",
    poster: "https://arch.agency/wp-content/uploads/2024/09/DD-featured.png",
    video: "https://arch.agency/wp-content/uploads/2024/09/DD-preview.mp4",
    stats: [
      { num: "500", label: "influencers" },
      { num: "1,500", label: "activations" },
      { num: "15", label: "countries" },
    ],
  },
  {
    title: "Match Masters",
    poster: "https://arch.agency/wp-content/uploads/2024/09/MM-featured.png",
    video: "https://arch.agency/wp-content/uploads/2024/09/MM-CS-video-preview.mp4",
    stats: [
      { num: "#1", label: "in 15 countries" },
      { num: "1,500", label: "influencers" },
      { num: "2,000", label: "activations" },
    ],
  },
];

const EXPERIENCE_STEPS = [
  {
    year: "2020–2022",
    role: "Growth Lead",
    company: "SuperPlay",
    text: "Scaled influencer programmes from 0 to 1,500+ activations across 15 markets.",
  },
  {
    year: "2022–2024",
    role: "Head of Partnerships",
    company: "Wargaming",
    text: "Managed 550 creators across 30 countries with a focus on performance measurement and long-term ROI.",
  },
  {
    year: "2024–present",
    role: "Independent Consultant",
    company: "mklenotic",
    text: "Helping brands build in-house creator operations and digital growth systems.",
  },
];

const BLOG_POSTS = [
  { title: "Why most influencer campaigns fail before they start", date: "Mar 2026" },
  { title: "The 3-metric framework I use for every brief", date: "Feb 2026" },
  { title: "Building a creator ops team from scratch", date: "Jan 2026" },
];

function ArrowLeft() {
  return (
    <svg viewBox="0 0 39 20" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M39 11.8672L6.39539 11.8672L11.7307 17.7242L9.51285 19.7445L0.97097 10.3672L9.51285 0.989867L11.7307 3.01009L6.39539 8.86717L39 8.86717L39 11.8672Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function SinglePageExperience() {
  const [progress, setProgress] = useState(0);
  const [loadDone, setLoadDone] = useState(false);
  const [preloaderHidden, setPreloaderHidden] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [activeExp, setActiveExp] = useState(0);
  const heroVideoRef = useRef(null);
  const modalVideoRef = useRef(null);

  useEffect(() => {
    const onLoad = () => setLoadDone(true);
    if (document.readyState === "complete") setLoadDone(true);
    else window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return Math.min(100, p + (loadDone ? 5 : 2));
      });
    }, 40);
    return () => clearInterval(id);
  }, [loadDone]);

  useEffect(() => {
    if (progress < 100) return undefined;
    const t = setTimeout(() => setPreloaderHidden(true), 380);
    return () => clearTimeout(t);
  }, [progress]);

  useEffect(() => {
    const nodes = document.querySelectorAll(".arch-benchmark-page .reveal-up");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [preloaderHidden]);

  useEffect(() => {
    if (!modalOpen) return;
    const v = modalVideoRef.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {});
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return undefined;
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  useEffect(() => {
    heroVideoRef.current?.play().catch(() => {});
  }, []);

  const openModal = () => { setModalOpen(true); setPlaying(true); setMuted(false); };
  const closeModal = () => { setModalOpen(false); modalVideoRef.current?.pause(); };
  const togglePlay = () => {
    const v = modalVideoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };
  const toggleMute = () => {
    const v = modalVideoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const prevExp = () => setActiveExp((i) => Math.max(0, i - 1));
  const nextExp = () => setActiveExp((i) => Math.min(EXPERIENCE_STEPS.length - 1, i + 1));
  const step = EXPERIENCE_STEPS[activeExp];

  return (
    <div className="arch-benchmark-page">
      {/* Preloader */}
      {!preloaderHidden && (
        <div className={`bento-preloader${progress >= 100 ? " done" : ""}`} aria-hidden>
          <div className="bento-preloader-ring">
            <div className="circle" style={{ "--progress": progress }} />
            <div className="num">{Math.min(100, Math.round(progress))}</div>
          </div>
        </div>
      )}

      <div className={`arch-main bento-container${progress >= 100 ? " ready" : ""}`}>
        {/* ── Navigation ── */}
        <OnePageNav />

        {/* ── Hero row: text + media ── */}
        <div className="bento-row bento-row--hero" id="hero">
          <div className="bento-card bento-card--hero reveal-up">
            <h1 className="title-a4 text-gradient">
              Digital growth<br />
              marketing &amp;<br />
              operations<br />
              for teams that ship
            </h1>
            <p className="text-b2">
              Benchmark-matched layout: crisp typography, editorial rhythm, and
              media-forward blocks — tuned for Marek Klenotic&apos;s positioning.
            </p>
          </div>
          <div className="bento-card bento-card--media reveal-up">
            <video
              ref={heroVideoRef}
              muted
              playsInline
              loop
              preload="metadata"
            >
              <source src={HERO_PREVIEW} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* ── Play button (overlaps between hero and projects) ── */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "-3rem", marginBottom: "-2rem", paddingRight: "3rem", position: "relative", zIndex: 5 }}>
          <button type="button" className="play-btn" onClick={openModal} aria-label="Play showreel">
            <span>Play<br />video</span>
          </button>
        </div>

        {/* ── Projects row: 3 equal cards ── */}
        <div className="bento-row bento-row--projects" id="case-studies">
          {PROJECTS.map((p) => (
            <div key={p.title} className="bento-card bento-card--project reveal-up">
              <video muted loop playsInline poster={p.poster} preload="metadata">
                <source src={p.video} type="video/mp4" />
              </video>
              <div className="project-info">
                <div className="title-a2">{p.title}</div>
                <div className="project-stats">
                  {p.stats.map((s) => (
                    <div key={s.label}>
                      <div className="stat-num">{s.num}</div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── History navigation bar ── */}
        <div className="bento-bar reveal-up">
          <span className="title-a0">Node navigation for history</span>
          <div className="arrows">
            <button type="button" onClick={prevExp} aria-label="Previous experience">
              <ArrowLeft />
            </button>
            <button type="button" className="next" onClick={nextExp} aria-label="Next experience">
              <ArrowLeft />
            </button>
          </div>
        </div>

        {/* ── Experience card ── */}
        <div className="bento-card bento-card--experience reveal-up" id="process">
          <div className="title-a0">{step.year} · {step.company}</div>
          <div className="title-a2">{step.role}</div>
          <p className="text-b1">{step.text}</p>
        </div>

        {/* ── Blog row: main + side ── */}
        <div className="bento-row bento-row--blog">
          <div className="bento-card bento-card--blog-main reveal-up">
            <div className="title-a0">Blog · Last published</div>
            <div className="title-a2">{BLOG_POSTS[0].title}</div>
            <p className="text-b2">{BLOG_POSTS[0].date}</p>
          </div>
          <div className="bento-card bento-card--blog-side reveal-up">
            <div className="title-a0">More posts</div>
            {BLOG_POSTS.slice(1).map((post) => (
              <p key={post.title} className="text-b2">{post.title}</p>
            ))}
          </div>
        </div>

        {/* ── Contact card (full width) ── */}
        <div className="bento-card bento-card--contact reveal-up" id="contact">
          <div className="title-a0">Get in touch</div>
          <div className="title-a4 text-gradient">
            Cut the fluff.<br />
            Let&apos;s talk.
          </div>
          <a className="bento-cta" href="mailto:mklen@mklenotic.cz">
            Contact me
          </a>
        </div>

        {/* ── Image + Form row ── */}
        <div className="bento-row bento-row--half">
          <div className="bento-card bento-card--media reveal-up">
            <img
              src="https://arch.agency/wp-content/uploads/2024/09/team1-800x800.png"
              alt="Team"
              loading="lazy"
            />
          </div>
          <div className="bento-card bento-card--form reveal-up">
            <div className="title-a2">Fresh updates,<br />zero snooze.</div>
            <form className="bento-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" name="email" placeholder="Your email" autoComplete="email" />
              <button type="submit">Subscribe</button>
              <p className="form-legal">
                By subscribing you agree to the{" "}
                <a href="/">cookie policy</a> and{" "}
                <a href="/">privacy policy</a>.
              </p>
            </form>
          </div>
        </div>

        {/* ── Footer ── */}
        <OnePageFooter />
      </div>

      {/* ── Video modal ── */}
      {modalOpen && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Video"
          tabIndex={-1}
          onClick={closeModal}
        >
          <div className="video-modal-inner" onClick={(e) => e.stopPropagation()}>
            <video ref={modalVideoRef} controls={false} playsInline loop preload="metadata">
              <source src={HERO_FULL} type="video/mp4" />
            </video>
            <div className="video-modal-controls">
              <button type="button" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
                {playing ? "❚❚" : "▶"}
              </button>
              <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
                {muted ? "🔇" : "🔊"}
              </button>
              <button type="button" onClick={closeModal} aria-label="Close">✕</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
