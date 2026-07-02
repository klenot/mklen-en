# Floating circles: hero → service section

## Goal

Add small white circles (placeholders for logos) that float slowly and freely
around the **hero** section — drifting even over the hero text. As the user
scrolls into the **service** section (the black box), the hero circles fluently
travel downward and join a second set of circles that are already floating
inside the black box, so that all of them end up floating together inside the
service section.

Also: pin the service-section copy — `Today's digital space is made for people
of many talents.` — to the bottom edge of the black box.

## Approved decisions

- **Mechanism:** Approach A — a single shared circle field (one overlay owns
  every circle), scroll-scrubbed. Circle motion is tied directly to scroll
  progress, so scrolling up/down scrubs the hero circles into and back out of
  the box.
- **After landing:** all circles keep floating slowly inside the box (same calm
  drift, now bounded to the box region).
- **Box copy:** pinned to the bottom edge with ~12px padding; circles float in
  the space above it.
- **Count:** ~14 circles total — 7 begin in the hero, 7 begin pre-seeded in the
  box. After the scrub, all 14 float together in the box.
- **Size:** small and responsive, `clamp(7px, 1.6vmin, 13px)` diameter, so they
  scale down gracefully on mobile.
- **Color:** white (reads on both the orange hero and the black box).
- **Timing (locked to box width):** the fall is tied directly to the black
  box's width. Box at **full width (full-bleed)** = all circles gathered in the
  box; box at its **narrowest (inset)** = all hero circles up at the top. Because
  the box spreads to full-bleed and then shrinks back to inset within the
  services scroll, the circles fall in as it widens and rise back to the top as
  it narrows again — the motion mirrors the box exactly, in both directions.
- **Accessibility:** respect `prefers-reduced-motion` — no continuous drift and
  no scrubbed travel when reduced motion is requested (circles render in a
  calm static resting arrangement instead).

## Architecture

### Layout context (existing, unchanged)

`Hero` (`h-[75vh]`) and `Services` (a black `aspect-video` box that expands to
full-bleed on scroll via its own `scrollYProgress`) both live inside
`FirstPanel`, which is absolutely positioned (`z-10`) and scrolls away as one
unit over the pinned 2nd panel.

### New component: `CircleField`

A single client component (`components/sections/CircleField.tsx`) that owns
every circle and renders them into one absolute, `pointer-events-none` overlay.

- **Placement space:** the overlay is an absolute, `pointer-events-none` layer
  spanning the hero→box stretch. In `page.tsx`, `Hero` + `Services` get wrapped
  in a `relative` container; `CircleField` is an absolute overlay inside it,
  layered above the hero text and the box (so circles fly over text). This
  overlay is only the *coordinate space* in which circles are positioned (hero
  band up top, box band at the bottom).
- **Progress source (must match the box):** the travel progress is measured
  against the **same element and offset as the `Services` box width** — the
  services section, `offset: ["start end", "end start"]` — NOT the hero+services
  wrapper. Only then do the width breakpoints (`0.45`, `0.7`, …) mean the same
  thing for the circles as they do for the box. This is wired by sharing a
  single ref to the services element between `Services` and `CircleField` (see
  wiring note below); each computes its own `scrollYProgress` from that same
  ref+offset, which yields identical values, so no motion values need to be
  threaded between the two components.

#### Circle model

Each circle is defined once (stable, module-level or `useMemo`, seeded so it is
deterministic and SSR-safe — no `Math.random()` during render):

```
{
  origin: "hero" | "box",
  // resting positions expressed as fractions of the overlay box (0..1)
  from: { x, y },   // where it sits before the scrub (hero region or box region)
  to:   { x, y },   // where it sits after the scrub (its slot inside the box)
  // per-circle drift parameters for the slow continuous float
  drift: { ax, ay, freqX, freqY, phase },
  size, // px, sampled within the small range
}
```

- `box`-origin circles have `from ≈ to` (already in the box; they only drift).
- `hero`-origin circles have `from` in the upper (hero) band and `to` in the
  box band; the scrub lerps `from → to`.

#### Position composition

For each circle, final position =
`lerp(from, to, travelProgress) + drift(t)`, where:

- `travelProgress` is derived from the shared `scrollYProgress` using the **same
  breakpoints as the box's `marginX`**, inverted so that full-bleed = 1 and
  inset = 0. Concretely it mirrors the existing `Services` margin keyframes:

  ```
  travelProgress = useTransform(
    scrollYProgress,
    [0, 0.3, 0.45, 0.7, 0.85, 1],
    [0,   0,    1,   1,    0,   0]   // 0 = circles at top, 1 = circles in box
  )
  ```

  These breakpoints are the single source of truth for the box's spread and must
  stay in sync with `Services`' `marginX`. Hero circles are fully gathered
  exactly across the full-bleed hold (0.45–0.7) and rise back out as the box
  shrinks (0.7–0.85).
- `drift(t)` is a small, slow sinusoidal offset driven by an animation loop
  (`requestAnimationFrame` / `useAnimationFrame` from motion), giving the
  free-floating feel. Amplitude stays small so landed circles remain visually
  inside the box above the pinned text.

Circles are `motion.span` (or plain absolutely-positioned spans updated via
motion values / transforms) — following the existing motion idiom. Prefer
`MotionValue`s + `useTransform` so scroll updates don't trigger React re-renders.

### `Services` changes

- Replace the centered `Some text` placeholder with the real copy pinned to the
  bottom edge: absolutely positioned at the bottom of the black box with ~12px
  padding, still driven by the existing `textOpacity` fade.
- Keep the existing margin / border-radius / opacity scroll transforms intact.
- Extract the width/spread breakpoints (`[0, 0.3, 0.45, 0.7, 0.85, 1]`) into a
  shared constant so `Services` (margin) and `CircleField` (travelProgress) can
  never drift out of sync.
- The service circles are NOT rendered by `Services` itself — they are part of
  the shared `CircleField` overlay so the field stays single-owner. The box
  region within the overlay is aligned to where the box sits when full-bleed.

### `page.tsx` changes & wiring

Wrap `Hero` and `Services` in a single `relative` container with `CircleField`
as an absolute overlay. Because `CircleField` must read the *same* scroll as the
box, the wrapper is a small client component that creates one shared ref to the
services element and hands it to both:

```
// HeroServices (client) — owns the shared services ref
<div className="relative">
  <CircleField servicesRef={servicesRef} />   {/* absolute inset-0, pointer-events-none */}
  <Hero />
  <Services ref={servicesRef} />               {/* Services uses the forwarded ref as its scroll target */}
</div>
```

- `Services` is refactored to accept a forwarded ref for its section element
  (it currently makes its own internal ref); its `useScroll` targets that ref.
- `CircleField` runs its own `useScroll({ target: servicesRef, offset: ["start
  end", "end start"] })` — identical target+offset, identical progress.
- `page.tsx` swaps the inline `<Hero /> <Services />` for `<HeroServices />`.

`PathAnimation` and everything below stay where they are.

## Units & boundaries

- `CircleField` — one clear purpose: own and animate all circles across the
  hero→box stretch. Depends on `motion` and the shared services ref (its scroll
  source). Testable/tunable in isolation via its constants.
- `Services` — unchanged responsibility (the reveal choreography of the black
  box) plus the bottom-pinned copy and accepting a forwarded ref. Does not know
  about circles.
- `HeroServices` — thin client wrapper that owns the shared services ref and
  composes `Hero`, `Services`, and `CircleField`.
- `page.tsx` — swaps in `HeroServices`; no other logic.

## Risks / tuning notes

- The box's landing band in overlay coordinates must line up with where the box
  actually is when full-bleed. Because both the overlay and the box live in the
  same scrolling `FirstPanel`, this is a fixed relationship we can express as
  fractions of the wrapper and fine-tune by eye. No live measurement of the
  box is required for v1.
- Drift amplitude must be small enough that landed circles never overlap the
  bottom-pinned text or spill outside the box.
- All randomness is seeded/deterministic to avoid SSR hydration mismatches.

## Out of scope

- Real logos (using white circles for now; the circle renderer should be easy to
  swap for `<img>`/logo nodes later).
- Any change to sections other than `Hero`/`Services` wiring and the new
  overlay.
