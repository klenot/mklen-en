"use client";

import { useEffect, useRef, useState } from "react";
import OnePageNav from "app/components/Homepage/one-page-nav";
import OnePageFooter from "app/components/Homepage/one-page-footer";

const PROJECTS = [
  {
    title: "Dattoo",
    desc: "End-to-end growth strategy for a digital tattoo platform — from acquisition funnels to retention loops.",
    tags: ["Growth Strategy", "Paid Media", "Analytics"],
  },
  {
    title: "Apadore",
    desc: "Creator-led launch campaign driving brand awareness and first-month revenue targets for a luxury fashion label.",
    tags: ["Creator Ops", "Brand Launch", "Influencer"],
  },
  {
    title: "Framer × MailerLite",
    desc: "Integration partnership campaign connecting design-forward teams with automated email workflows.",
    tags: ["Partnerships", "Automation", "B2B"],
  },
];

const EXPERIENCE_STEPS = [
  {
    year: "2019–2020",
    role: "Marketing Coordinator",
    company: "Early Career",
    text: "Cut teeth on paid acquisition, SEO, and analytics tooling across multiple verticals.",
  },
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

function ArrowDown() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden>
      <path
        d="M10 0v20m0 0l-8-8m8 8l8-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
  const [activeExp, setActiveExp] = useState(0);
  const heroVideoRef = useRef(null);

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
    heroVideoRef.current?.play().catch(() => {});
  }, []);

  const scrollToProjects = () => {
    document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" });
  };

  const prevExp = () => setActiveExp((i) => Math.max(0, i - 1));
  const nextExp = () => setActiveExp((i) => Math.min(EXPERIENCE_STEPS.length - 1, i + 1));
  const step = EXPERIENCE_STEPS[activeExp];

  return (
    <div className="arch-benchmark-page">
      {!preloaderHidden && (
        <div className={`bento-preloader${progress >= 100 ? " done" : ""}`} aria-hidden>
          <div className="bento-preloader-ring">
            <div className="circle" style={{ "--progress": progress }} />
            <div className="num">{Math.min(100, Math.round(progress))}</div>
          </div>
        </div>
      )}

      <div className={`arch-main bento-container${progress >= 100 ? " ready" : ""}`}>
        <OnePageNav />

        {/* Hero: text 2col | right column: anim stacked over scroll btn */}
        <div className="bento-hero-grid" id="hero">
          <div className="bento-card bento-card--hero reveal-up">
            <h1 className="title-a4 text-gradient">
              Digital growth<br />
              marketing &amp;<br />
              operations<br />
              for teams that ship
            </h1>
            <p className="text-b2">
              I help brands build creator programmes, growth systems, and
              data-driven operations — from strategy to execution.
            </p>
          </div>

          <div className="hero-right-col reveal-up">
            <div className="bento-card bento-card--hero-media">
              <video
                ref={heroVideoRef}
                muted
                playsInline
                loop
                preload="metadata"
              >
                <source src="/3d/open-pelican-case-with-ai-tools.mp4" type="video/mp4" />
              </video>
            </div>
            <button
              type="button"
              className="scroll-btn"
              onClick={scrollToProjects}
              aria-label="Scroll to projects"
            >
              <ArrowDown />
            </button>
          </div>
        </div>

        {/* Projects: 3 equal cards */}
        <div className="bento-row bento-row--projects" id="case-studies">
          {PROJECTS.map((p) => (
            <div key={p.title} className="bento-card bento-card--project reveal-up">
              <div className="project-placeholder-img" />
              <div className="project-body">
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="project-tag">{t}</span>
                  ))}
                </div>
                <div className="title-a2">{p.title}</div>
                <p className="text-b2">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline row: dots bar + arrows as separate siblings */}
        <div className="timeline-row reveal-up" id="process">
          <div className="timeline-bar">
            <div className="timeline-track">
              {EXPERIENCE_STEPS.map((s, i) => (
                <button
                  key={s.year}
                  type="button"
                  className={`timeline-dot${i === activeExp ? " active" : ""}`}
                  onClick={() => setActiveExp(i)}
                  aria-label={s.year}
              >
                <span className="timeline-dot-pip" />
              </button>
              ))}
              <div className="timeline-line" />
            </div>
          </div>
          <div className="timeline-arrows">
            <button type="button" onClick={prevExp} aria-label="Previous experience">
              <ArrowLeft />
            </button>
            <button type="button" className="next" onClick={nextExp} aria-label="Next experience">
              <ArrowLeft />
            </button>
          </div>
        </div>

        {/* Experience content */}
        <div className="bento-card bento-card--experience reveal-up">
          <div className="title-a0">{step.year} · {step.company}</div>
          <div className="title-a2">{step.role}</div>
          <p className="text-b1">{step.text}</p>
        </div>

        {/* Blog row: main post with cover placeholder + square cube */}
        <div className="bento-row bento-row--blog" id="blog">
          <div className="bento-card bento-card--blog-main reveal-up">
            <div className="blog-main-inner">
              <div className="blog-main-text">
                <div className="blog-top">
                  <div className="title-a0">Blog · Last published</div>
                  <div className="blog-meta">
                    <span className="blog-category">News</span>
                    <span className="blog-date">· Mar 2026</span>
                  </div>
                </div>
                <div className="title-a2">Create a Custom Automated Report Using Minimal Resources</div>
              </div>
              <div className="blog-cover-placeholder" />
            </div>
          </div>
          <div className="bento-card bento-card--blog-cube reveal-up">
            <div className="cube-placeholder">
              <div className="cube-face">More posts</div>
            </div>
          </div>
        </div>

        {/* Contact: text left + 3D anim right */}
        <div className="bento-card bento-card--contact reveal-up" id="contact">
          <div className="contact-inner">
            <div className="contact-text">
              <div className="contact-headings">
                <div className="title-a0">Get in touch</div>
                <div className="title-a4 text-gradient">
                  Cut the fluff.<br />
                  Let&apos;s talk.
                </div>
              </div>
              <a className="bento-cta" href="mailto:mklen@mklenotic.cz">
                Contact me
              </a>
            </div>
            <div className="contact-anim">
              <video muted playsInline loop autoPlay preload="metadata">
                <source src="/3d/golden-trophy-1.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* 3D animation + Newsletter row */}
        <div className="bento-row bento-row--bottom">
          <div className="bento-card bento-card--media-3d reveal-up">
            <video muted playsInline loop autoPlay preload="metadata">
              <source src="/3d/happy-retro-robot.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="bento-card bento-card--form reveal-up">
            <div className="title-a2">Fresh updates,<br />zero snooze.</div>
            <form className="bento-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-inline">
                <input type="email" name="email" placeholder="Your email" autoComplete="email" />
                <button type="submit">Subscribe</button>
              </div>
              <p className="form-legal">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        <OnePageFooter />
      </div>
    </div>
  );
}
