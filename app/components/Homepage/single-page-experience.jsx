"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import OnePageNav from "app/components/Homepage/one-page-nav";
import OnePageFooter from "app/components/Homepage/one-page-footer";

const HERO_PREVIEW =
  "https://arch.agency/wp-content/uploads/2024/09/Reel-2024-Preview-V1-resized.mp4";
const HERO_FULL =
  "https://arch.agency/wp-content/uploads/2024/09/Arch.-Influencer-Agency-2024-Reel-Web-resized.mp4";

const CASE_STUDIES = [
  {
    href: "#",
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
    href: "#",
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
    href: "#",
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

const PROCESS_STEPS = [
  {
    title: "Briefing",
    text: "In order to deliver you results, we have to get fully familiar with your brand, the particular campaign goals, and your specific needs. This is also when we discuss the budget.",
  },
  {
    title: "Influencer scouting and negotiation",
    text: "Once we’ve get to know your brand and the project needs, we’ll line up influencers who not only fit the bill but also share your vibe.",
  },
  {
    title: "Content creation and going live",
    text: "By blending your brief with the influencer’s creativity, we make sure every activation is spot-on and primed to deliver the best results. Plus, we’ve got your back on the legal front and keep everything aligned with your brand guidelines.",
  },
  {
    title: "Debriefing",
    text: "Once the campaign wraps up, we dive into the data to see what hit the mark and where we can level up. By analysing the results, we fine-tune our approach to keep delivering exceptional outcomes every time.",
  },
];

const CLIENT_LOGOS = [
  { src: "https://arch.agency/wp-content/uploads/2024/09/Red-Bull.svg", alt: "Red Bull" },
  { src: "https://arch.agency/wp-content/uploads/2024/09/SAMSUNG.svg", alt: "Samsung" },
  { src: "https://arch.agency/wp-content/uploads/2024/09/Surfshark.svg", alt: "Surfshark" },
  { src: "https://arch.agency/wp-content/uploads/2024/09/Wargaming.svg", alt: "Wargaming" },
  { src: "https://arch.agency/wp-content/uploads/2024/09/SuperPlay.svg", alt: "SuperPlay" },
  { src: "https://arch.agency/wp-content/uploads/2024/09/NetEase-Games.svg", alt: "NetEase" },
];

const INFLUENCER_IMAGES = {
  main: "https://arch.agency/wp-content/uploads/2024/09/Beta-Squad-600x533.jpeg",
  side1: "https://arch.agency/wp-content/uploads/2024/09/NARUCIAK.png",
  side2: "https://arch.agency/wp-content/uploads/2024/09/lufy.jpg",
};

const TEAM_IMAGES = {
  main: "https://arch.agency/wp-content/uploads/2024/09/team1-800x800.png",
  side1: "https://arch.agency/wp-content/uploads/2024/09/team2-800x800.png",
  side2: "https://arch.agency/wp-content/uploads/2024/09/team6-800x800.png",
};

const PLATFORM_LOGOS = [
  { src: "https://arch.agency/wp-content/uploads/2024/09/YouTube-1.svg", alt: "YouTube" },
  { src: "https://arch.agency/wp-content/uploads/2024/09/Twitch-1.svg", alt: "Twitch" },
  { src: "https://arch.agency/wp-content/uploads/2024/09/TikTok-1.svg", alt: "TikTok" },
];

const PRESS_LOGOS = [
  {
    src: "https://arch.agency/wp-content/uploads/2024/09/IMH.png",
    alt: "Influencer Marketing Hub",
  },
  {
    src: "https://arch.agency/wp-content/uploads/2024/09/Mobilegamer.png",
    alt: "Mobilegamer",
  },
  { src: "https://arch.agency/wp-content/uploads/2024/09/Lider.svg", alt: "Lider" },
];

function LineReveal({ children, className = "" }) {
  return (
    <span className={`arch-line ${className}`}>
      <span className='arch-line-inner'>{children}</span>
    </span>
  );
}

export default function SinglePageExperience() {
  const [progress, setProgress] = useState(0);
  const [loadDone, setLoadDone] = useState(false);
  const [preloaderHidden, setPreloaderHidden] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const heroVideoRef = useRef(null);
  const modalVideoRef = useRef(null);
  const processSwiperRef = useRef(null);

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
        const step = loadDone ? 5 : 2;
        return Math.min(100, p + step);
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
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  const openModal = () => {
    setModalOpen(true);
    setPlaying(true);
    setMuted(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    const v = modalVideoRef.current;
    if (v) {
      v.pause();
    }
  };

  const togglePlay = () => {
    const v = modalVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = modalVideoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const processFill =
    PROCESS_STEPS.length <= 1 ? 100 : (activeStep / (PROCESS_STEPS.length - 1)) * 100;

  return (
    <div className='arch-benchmark-page'>
      {!preloaderHidden && (
        <div
          className={`arch-preloader${progress >= 100 ? " arch-preloader--done" : ""}`}
          aria-hidden
        >
          <div className='arch-preloader-inner'>
            <div className='arch-progress-circle' style={{ "--progress": progress }} />
            <p className='arch-preloader-num'>{Math.min(100, Math.round(progress))}</p>
          </div>
        </div>
      )}

      <main className={`arch-main${progress >= 100 ? " arch-main--ready" : ""}`}>
        <OnePageNav />

        <section className='arch-two-cards' id='hero'>
          <div className='arch-container'>
            <div className='arch-grid'>
              <div className='arch-big-card'>
                <h1 className='title-a4 uppercase'>
                  <LineReveal>Digital growth</LineReveal>
                  <LineReveal>marketing &amp;</LineReveal>
                  <LineReveal>operations</LineReveal>
                  <LineReveal>for teams that ship</LineReveal>
                </h1>
                <p className='text-b2 reveal-up'>
                  Benchmark-matched layout: crisp typography, editorial rhythm, and media-forward
                  blocks — tuned here for Marek Klenotic&apos;s positioning while keeping the
                  reference structure intact.
                </p>
              </div>

              <div>
                <button
                  type='button'
                  className='arch-media-frame'
                  onClick={openModal}
                  aria-label='Play showreel'
                >
                  <video
                    ref={heroVideoRef}
                    id='heroVideo'
                    muted
                    playsInline
                    loop
                    poster=''
                    preload='metadata'
                  >
                    <source src={HERO_PREVIEW} type='video/mp4' />
                  </video>
                </button>
                <div className='arch-button-frame'>
                  <button
                    type='button'
                    className='arch-button-circle'
                    onClick={openModal}
                    aria-label='Play video'
                  >
                    <div>
                      <span>Play video</span>
                      <div>
                        <svg viewBox='0 0 10 14' fill='none' aria-hidden>
                          <path d='M0 0L10 7L0 14V0Z' fill='currentColor' />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='arch-circle-band'>
          <div className='arch-container'>
            <div className='go-down arch-go-down'>
              <button
                type='button'
                aria-label='Scroll to case studies'
                onClick={() =>
                  document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <svg viewBox='0 0 35 72' fill='none' aria-hidden>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M19.5003 0.5V63.6716L31.6861 51.4858L34.5145 54.3142L17.5003 71.3284L0.486084 54.3142L3.31451 51.4858L15.5003 63.6716V0.5H19.5003Z'
                    fill='currentColor'
                  />
                </svg>
              </button>
            </div>
            <div className='arch-card'>
              <div className='title-a2 reveal-up'>
                <LineReveal>Featured</LineReveal> <LineReveal>projects</LineReveal>
              </div>
              <p className='text-b4 reveal-up'>Influencer-style delivery with tangible outcomes</p>
            </div>
          </div>
        </section>

        <section className='arch-case-section' id='case-studies'>
          <div className='arch-container arch-case-shell'>
            <Swiper
              modules={[Navigation]}
              slidesPerView='auto'
              spaceBetween={18}
              navigation={{
                prevEl: ".arch-nav-case-prev",
                nextEl: ".arch-nav-case-next",
              }}
            >
              {CASE_STUDIES.map((cs) => (
                <SwiperSlide key={cs.title} className='arch-case-slide'>
                  <a href={cs.href} className='arch-case-card'>
                    <video muted loop playsInline poster={cs.poster} preload='metadata'>
                      <source src={cs.video} type='video/mp4' />
                    </video>
                    <div className='arch-case-cnt'>
                      <div>
                        <div className='title-a2'>{cs.title}</div>
                        <div className='text-b4' />
                      </div>
                      <div className='arch-case-stats'>
                        {cs.stats.map((s) => (
                          <div key={s.label}>
                            <div className='num'>{s.num}</div>
                            <div className='text-b4'>{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <span className='arch-case-tooltip'>Case study</span>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='arch-swiper-nav'>
              <span />
              <div className='arch-arrows'>
                <button type='button' className='arch-nav-case-prev' aria-label='Previous slide'>
                  <svg viewBox='0 0 39 20' fill='none' aria-hidden>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M39 11.8672L6.39539 11.8672L11.7307 17.7242L9.51285 19.7445L0.97097 10.3672L9.51285 0.989867L11.7307 3.01009L6.39539 8.86717L39 8.86717L39 11.8672Z'
                      fill='currentColor'
                    />
                  </svg>
                </button>
                <button type='button' className='arch-nav-case-next arch-next' aria-label='Next slide'>
                  <svg viewBox='0 0 39 20' fill='none' aria-hidden>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M39 11.8672L6.39539 11.8672L11.7307 17.7242L9.51285 19.7445L0.97097 10.3672L9.51285 0.989867L11.7307 3.01009L6.39539 8.86717L39 8.86717L39 11.8672Z'
                      fill='currentColor'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className='arch-split'>
          <div className='arch-container'>
            <div className='arch-grid'>
              <div className='arch-model-slot reveal-up'>3D canvas slot</div>
              <div className='arch-content-blue reveal-up'>
                <div className='title-a2'>
                  <LineReveal>Here&apos;s</LineReveal> <LineReveal>how</LineReveal>{" "}
                  <LineReveal>we</LineReveal>
                  <br />
                  <LineReveal>roll</LineReveal>
                </div>
                <p className='text-b2'>
                  Check out the game plan for delivering results — structure, measurement, and
                  iteration without the fluff.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className='arch-dots-section' id='process'>
          <div className='arch-container'>
            <div className='arch-dots-head'>
              <div>
                <div className='arch-progress-track'>
                  <div className='arch-progress-fill' style={{ width: `${processFill}%` }} />
                  <div className='arch-progress-dots'>
                    {PROCESS_STEPS.map((step, i) => (
                      <button
                        key={step.title}
                        type='button'
                        className={`arch-dot${i === activeStep ? " active" : ""}`}
                        aria-label={`Go to step ${i + 1}`}
                        onClick={() => {
                          setActiveStep(i);
                          processSwiperRef.current?.slideTo(i);
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className='arch-arrows'>
                  <button type='button' className='arch-nav-process-prev' aria-label='Previous'>
                    <svg viewBox='0 0 39 20' fill='none' aria-hidden>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M39 11.8672L6.39539 11.8672L11.7307 17.7242L9.51285 19.7445L0.97097 10.3672L9.51285 0.989867L11.7307 3.01009L6.39539 8.86717L39 8.86717L39 11.8672Z'
                        fill='currentColor'
                      />
                    </svg>
                  </button>
                  <button type='button' className='arch-nav-process-next arch-next' aria-label='Next'>
                    <svg viewBox='0 0 39 20' fill='none' aria-hidden>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M39 11.8672L6.39539 11.8672L11.7307 17.7242L9.51285 19.7445L0.97097 10.3672L9.51285 0.989867L11.7307 3.01009L6.39539 8.86717L39 8.86717L39 11.8672Z'
                        fill='currentColor'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <Swiper
              modules={[EffectFade, Navigation]}
              effect='fade'
              speed={420}
              loop={false}
              onSwiper={(swiper) => {
                processSwiperRef.current = swiper;
              }}
              navigation={{
                prevEl: ".arch-nav-process-prev",
                nextEl: ".arch-nav-process-next",
              }}
              onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
            >
              {PROCESS_STEPS.map((step) => (
                <SwiperSlide key={step.title}>
                  <div className='arch-process-card reveal-up'>
                    <div className='title-a0'>{step.title}</div>
                    <p className='arch-process-text'>{step.text}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className='arch-mobile-arrows'>
              <button
                type='button'
                aria-label='Previous'
                onClick={() =>
                  processSwiperRef.current?.slideTo(
                    Math.max(0, (processSwiperRef.current?.activeIndex ?? 1) - 1)
                  )
                }
              >
                <svg viewBox='0 0 39 20' fill='none' aria-hidden>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M39 11.8672L6.39539 11.8672L11.7307 17.7242L9.51285 19.7445L0.97097 10.3672L9.51285 0.989867L11.7307 3.01009L6.39539 8.86717L39 8.86717L39 11.8672Z'
                    fill='currentColor'
                  />
                </svg>
              </button>
              <button
                type='button'
                className='arch-next'
                aria-label='Next'
                onClick={() =>
                  processSwiperRef.current?.slideTo(
                    Math.min(
                      PROCESS_STEPS.length - 1,
                      (processSwiperRef.current?.activeIndex ?? -1) + 1
                    )
                  )
                }
              >
                <svg viewBox='0 0 39 20' fill='none' aria-hidden>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M39 11.8672L6.39539 11.8672L11.7307 17.7242L9.51285 19.7445L0.97097 10.3672L9.51285 0.989867L11.7307 3.01009L6.39539 8.86717L39 8.86717L39 11.8672Z'
                    fill='currentColor'
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <section className='arch-clients' id='clients'>
          <div className='arch-container'>
            <div className='arch-grid'>
              <div className='reveal-up'>
                <div className='title-a0'>
                  <LineReveal>Our</LineReveal> <LineReveal>clients</LineReveal>
                </div>
                <div className='title-a2'>
                  <LineReveal>5 years.</LineReveal> <LineReveal>Over 5,000</LineReveal>
                  <br />
                  <LineReveal>matches across</LineReveal> <LineReveal>5 continents.</LineReveal>
                </div>
                <a className='arch-button-1' href='mailto:mklen@mklenotic.cz'>
                  Let&apos;s partner up
                </a>
              </div>
              <div>
                <div className='arch-logo-cards reveal-up'>
                  {CLIENT_LOGOS.map((logo) => (
                    <img key={logo.src} src={logo.src} alt={logo.alt} loading='lazy' />
                  ))}
                </div>
                <a className='arch-button-1 arch-mobile-only' href='mailto:mklen@mklenotic.cz'>
                  Let&apos;s partner up
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className='arch-persp-section'>
          <div className='arch-container'>
            <div className='arch-persp-grid'>
              <div className='reveal-up'>
                <div className='title-a0'>
                  <LineReveal>Influencers</LineReveal> <LineReveal>we roll with</LineReveal>
                </div>
                <div className='title-a4 uppercase'>
                  <LineReveal>Beta Squad</LineReveal>
                  <LineReveal>10M</LineReveal>
                </div>
              </div>
              <div className='arch-mosaic reveal-up'>
                <img className='arch-mosaic-main' src={INFLUENCER_IMAGES.main} alt='Creators' />
                <img src={INFLUENCER_IMAGES.side1} alt='' />
                <img src={INFLUENCER_IMAGES.side2} alt='' />
              </div>
            </div>
          </div>
        </section>

        <section className='arch-persp-section'>
          <div className='arch-container'>
            <div className='arch-persp-grid'>
              <div className='arch-mosaic reveal-up'>
                <img className='arch-mosaic-main' src={TEAM_IMAGES.main} alt='Team' />
                <img src={TEAM_IMAGES.side1} alt='' />
                <img src={TEAM_IMAGES.side2} alt='' />
              </div>
              <div className='reveal-up'>
                <div className='title-a0'>
                  <LineReveal>Meet</LineReveal> <LineReveal>our team</LineReveal>
                </div>
                <div className='title-a2'>
                  <LineReveal>30 experts fluent</LineReveal>
                  <br />
                  <LineReveal>in 10 languages,</LineReveal>
                  <LineReveal>one focus: growth.</LineReveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='arch-persp-section arch-invert'>
          <div className='arch-container'>
            <div className='arch-persp-grid'>
              <div className='reveal-up'>
                <div className='title-a2'>
                  <LineReveal>We love</LineReveal> <LineReveal>all platforms</LineReveal>
                </div>
                <p className='text-b2'>
                  We&apos;re results-driven. Whatever channel moves the needle, we build the system
                  around it.
                </p>
              </div>
              <div className='arch-mosaic reveal-up'>
                {PLATFORM_LOGOS.map((logo, i) => (
                  <img
                    key={logo.src}
                    className={i === 0 ? "arch-mosaic-main" : ""}
                    src={logo.src}
                    alt={logo.alt}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className='arch-persp-section arch-invert'>
          <div className='arch-container'>
            <div className='arch-persp-grid'>
              <div className='reveal-up'>
                <div className='title-a2'>
                  <LineReveal>Featured in</LineReveal>
                  <br />
                  <LineReveal>top industry mags</LineReveal>
                </div>
                <p className='text-b2'>
                  Hyped to see the work reflected in serious trade coverage — same energy, your
                  brand story.
                </p>
              </div>
              <div className='arch-mosaic reveal-up'>
                {PRESS_LOGOS.map((logo, i) => (
                  <img
                    key={logo.src}
                    className={i === 0 ? "arch-mosaic-main" : ""}
                    src={logo.src}
                    alt={logo.alt}
                    loading='lazy'
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className='arch-cta'>
          <div className='arch-container'>
            <a className='arch-cta-grid' href='mailto:mklen@mklenotic.cz'>
              <div>
                <div className='title-a4 uppercase'>
                  <LineReveal>Cut the fluff.</LineReveal>
                  <LineReveal>Let&apos;s get in touch.</LineReveal>
                </div>
                <p className='text-b2'>
                  Get a partner who&apos;s all about results — no ifs, ands, or buts.
                </p>
              </div>
              <div className='arch-cta-model'>3D canvas slot</div>
              <span className='arch-cta-tooltip'>Contact us</span>
            </a>
          </div>
        </section>

        <section className='arch-newsletter' id='newsletter'>
          <div className='arch-container'>
            <div className='arch-grid'>
              <div className='arch-model-slot reveal-up'>3D envelope slot</div>
              <div className='reveal-up'>
                <div className='title-a2'>
                  <LineReveal>Fresh updates,</LineReveal>
                  <br />
                  <LineReveal>zero snooze.</LineReveal>
                </div>
                <form
                  className='arch-news-form'
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input type='email' name='email' placeholder='Your email' autoComplete='email' />
                  <button type='submit'>Subscribe</button>
                </form>
                <p className='arch-news-copy'>
                  By subscribing you agree to the <a href='/'>cookie policy</a> and{" "}
                  <a href='/'>privacy policy</a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <OnePageFooter />
      </main>

      {modalOpen && (
        <div
          className='arch-video-modal'
          role='dialog'
          aria-modal='true'
          aria-label='Video'
          tabIndex={-1}
          onClick={closeModal}
        >
          <div className='arch-video-frame' onClick={(e) => e.stopPropagation()}>
            <video ref={modalVideoRef} controls={false} playsInline loop preload='metadata'>
              <source src={HERO_FULL} type='video/mp4' />
            </video>
            <div className='arch-video-controls'>
              <button type='button' onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
                {playing ? "Pause" : "Play"}
              </button>
              <button type='button' onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
                {muted ? "Unmute" : "Mute"}
              </button>
              <button type='button' onClick={closeModal} aria-label='Close'>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
