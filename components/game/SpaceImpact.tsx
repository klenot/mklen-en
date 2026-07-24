"use client";

import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/* ------------------------------------------------------------------ *
 * Space Impact — a small, self-contained canvas game.
 *
 * Everything lives in this file (plus GameErrorBoundary) so it can be
 * ripped out or disabled without touching the rest of the site. It only
 * runs while status === "playing" AND the section is on screen, and it
 * only ever hijacks the arrow/space keys while actively playing, so it
 * never interferes with normal page scrolling.
 * ------------------------------------------------------------------ */

type Status = "idle" | "playing" | "won" | "lost";

// tuning knobs — desktop defaults; mobile uses smaller sprites + denser grid
const DESKTOP_PIXEL = 4; // css px per rendered game pixel
const DESKTOP_SCALE = 3; // game px per sprite cell
const MOBILE_PIXEL = 3;
const MOBILE_SCALE = 2;
const LIVES = 3;
const GAME_DURATION = 60_000; // survive this long (ms) to win
const FIRE_COOLDOWN = 240; // ms between shots
const SHIP_SPEED = 115; // game px / second
const MOBILE_SHIP_SPEED = 185; // snappier joystick feel on small screens
const BULLET_SPEED = 170;
const ENEMY_SPEED_MIN = 42;
const ENEMY_SPEED_MAX = 78;
const SPAWN_MIN = 620; // ms between spawns
const SPAWN_MAX = 1150;
const INVULN = 1300; // ms of mercy after a hit

const COLOR_BULLET = "#3b82f6"; // blue-500
const COLOR_STAR = "#00000018";
const COLOR_FLAME = "#f97316"; // orange-500

type Sprite = string[];
type Palette = Record<string, string>;

// Ship: solid-black hull styled after the classic Space Impact craft.
// Built from a top half mirrored around the center (x-axis) row.
// The exhaust flame is drawn separately behind it.
// prettier-ignore
const SHIP: Sprite = [
  "XX        ",
  " XX XXX   ",
  "  X XX X  ",
  " X XXXX XX",
  "  X XX X  ",
  " XX XXX   ",
  "XX        ",
];
const SHIP_PALETTE: Palette = { X: "#000000" };

type Variant = { sprite: Sprite; palette: Palette; speedMul: number };

// A little bestiary so the sky isn't monotonous.
const VARIANTS: Variant[] = [
  {
    // grunt — small orange blob
    // prettier-ignore
    sprite: [
      "  XXX",
      " XXXX",
      "XXoXX",
      " XXXX",
      "  XXX",
    ],
    palette: { X: "#f97316", o: "#0a0a0a" },
    speedMul: 1,
  },
  {
    // saucer — wide two-eyed red cruiser
    // prettier-ignore
    sprite: [
      " XXXXX ",
      "XXXXXXX",
      "XoXXXoX",
      "XXXXXXX",
      " XX XX ",
    ],
    palette: { X: "#ef4444", o: "#ffffff" },
    speedMul: 0.85,
  },
  {
    // darter — small fast purple arrow
    // prettier-ignore
    sprite: [
      "X    ",
      "XX   ",
      "XXXXX",
      "XX   ",
      "X    ",
    ],
    palette: { X: "#a855f7" },
    speedMul: 1.65,
  },
  {
    // brute — chunky slow tank
    // prettier-ignore
    sprite: [
      "XXXXX ",
      "XoXXXX",
      "XXXXXX",
      "XXXXXX",
      "XoXXXX",
      "XXXXX ",
    ],
    palette: { X: "#374151", o: "#f97316" },
    speedMul: 0.6,
  },
];

const spriteW = (s: Sprite, scale: number) => s[0].length * scale;
const spriteH = (s: Sprite, scale: number) => s.length * scale;

const gameConfig = (mobile: boolean) =>
  mobile
    ? { pixel: MOBILE_PIXEL, scale: MOBILE_SCALE }
    : { pixel: DESKTOP_PIXEL, scale: DESKTOP_SCALE };

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const randInt = (n: number) => Math.floor(Math.random() * n);

function overlap(
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number,
) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: Sprite,
  x: number,
  y: number,
  palette: Palette,
  scale: number,
) {
  const px = Math.round(x);
  const py = Math.round(y);
  for (let r = 0; r < sprite.length; r++) {
    const row = sprite[r];
    for (let c = 0; c < row.length; c++) {
      const color = palette[row[c]];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(px + c * scale, py + r * scale, scale, scale);
    }
  }
}

type MobileInput = {
  moveX: number;
  moveY: number;
  firing: boolean;
};

const MOBILE_CONTROLS_BOTTOM_FALLBACK = 88;

const JOYSTICK_RADIUS = 36;
const JOYSTICK_DEAD = 0.06;

function joystickAxis(value: number) {
  const abs = Math.abs(value);
  if (abs < JOYSTICK_DEAD) return 0;
  const t = (abs - JOYSTICK_DEAD) / (1 - JOYSTICK_DEAD);
  return Math.sign(value) * Math.min(1, Math.pow(t, 0.55) * 1.08);
}

function useMobileControlsBottom(active: boolean) {
  const [bottomPx, setBottomPx] = useState(MOBILE_CONTROLS_BOTTOM_FALLBACK);

  useEffect(() => {
    if (!active) return;

    const update = () => {
      const vv = window.visualViewport;
      if (!vv) {
        setBottomPx(MOBILE_CONTROLS_BOTTOM_FALLBACK);
        return;
      }

      const browserChrome = Math.max(
        0,
        window.innerHeight - vv.height - vv.offsetTop,
      );
      setBottomPx(Math.max(MOBILE_CONTROLS_BOTTOM_FALLBACK, browserChrome + 56));
    };

    update();
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [active]);

  return bottomPx;
}

function MobileJoystick({
  inputRef,
  bottomPx,
}: {
  inputRef: RefObject<MobileInput>;
  bottomPx: number;
}) {
  const baseRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);

  const setKnobPosition = (x: number, y: number) => {
    const knob = knobRef.current;
    if (!knob) return;
    knob.style.left = `calc(50% + ${x}px)`;
    knob.style.top = `calc(50% + ${y}px)`;
  };

  const applyPointer = (clientX: number, clientY: number) => {
    const base = baseRef.current;
    if (!base) return;
    const rect = base.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let dx = clientX - cx;
    let dy = clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > JOYSTICK_RADIUS) {
      dx = (dx / dist) * JOYSTICK_RADIUS;
      dy = (dy / dist) * JOYSTICK_RADIUS;
    }
    setKnobPosition(dx, dy);
    inputRef.current.moveX = joystickAxis(dx / JOYSTICK_RADIUS);
    inputRef.current.moveY = joystickAxis(dy / JOYSTICK_RADIUS);
  };

  const reset = () => {
    activeRef.current = false;
    setKnobPosition(0, 0);
    inputRef.current.moveX = 0;
    inputRef.current.moveY = 0;
  };

  return (
    <div
      ref={baseRef}
      aria-label="Move"
      className="absolute left-4 z-10 touch-none select-none"
      style={{ bottom: bottomPx }}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        activeRef.current = true;
        baseRef.current?.setPointerCapture(e.pointerId);
        applyPointer(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (!activeRef.current) return;
        applyPointer(e.clientX, e.clientY);
      }}
      onPointerUp={reset}
      onPointerCancel={reset}
    >
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-black/25 bg-white/70">
        <div
          ref={knobRef}
          className="absolute h-12 w-12 rounded-full border-2 border-black bg-white shadow-sm"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}

function ScoreBragForm({ score }: { score: number }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "sent" | "error"
  >("idle");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || status === "submitting" || status === "sent") return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/space-impact-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, score }),
      });
      if (!response.ok) throw new Error("send failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-sm flex-col items-center gap-3"
    >
      <p className="font-mono text-xs font-light text-black/50">
        Wanna brag about your score?
      </p>
      <div className="flex w-full items-end gap-2">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          disabled={status === "submitting" || status === "sent"}
          className="form-input min-w-0 flex-1"
        />
        <button
          type="submit"
          aria-label="Send score"
          disabled={status === "submitting" || status === "sent"}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-black font-mono text-lg leading-none text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "submitting" ? "…" : "→"}
        </button>
      </div>
      {status === "sent" ? (
        <p className="font-mono text-xs text-black/50">Score sent. Thanks!</p>
      ) : null}
      {status === "error" ? (
        <p className="font-mono text-xs text-red-600" role="alert">
          Could not send. Try again in a moment.
        </p>
      ) : null}
    </form>
  );
}

export default function SpaceImpact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mobileInputRef = useRef<MobileInput>({
    moveX: 0,
    moveY: 0,
    firing: false,
  });
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [status, setStatus] = useState<Status>("idle");
  const controlsBottomPx = useMobileControlsBottom(isMobile && status === "playing");
  const [lives, setLives] = useState(LIVES);
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(GAME_DURATION / 1000);

  const clearMobileInput = () => {
    mobileInputRef.current.moveX = 0;
    mobileInputRef.current.moveY = 0;
    mobileInputRef.current.firing = false;
  };

  const start = () => {
    clearMobileInput();
    setLives(LIVES);
    setScore(0);
    setSecondsLeft(GAME_DURATION / 1000);
    setStatus("playing");
  };

  // After a game ends, drop back to the intro screen if left untouched.
  useEffect(() => {
    if (status !== "won" && status !== "lost") return;
    const id = setTimeout(() => setStatus("idle"), 30_000);
    return () => clearTimeout(id);
  }, [status]);

  useEffect(() => {
    if (status !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { pixel: PIXEL, scale: SCALE } = gameConfig(isMobile);
    const SHIP_W = spriteW(SHIP, SCALE);
    const SHIP_H = spriteH(SHIP, SCALE);

    // --- mutable game state (local to this run) ---
    let W = 1;
    let H = 1;
    let shipX = SCALE * 3;
    let shipY = 0;
    const keys = new Set<string>();
    const bullets: { x: number; y: number }[] = [];
    const enemies: { x: number; y: number; speed: number; vi: number }[] = [];
    const stars: { x: number; y: number; speed: number }[] = [];

    let elapsed = 0;
    let livesLeft = LIVES;
    let score = 0;
    let shownLives = LIVES;
    let shownScore = 0;
    let shownSec = GAME_DURATION / 1000;
    let invulnUntil = -Infinity;
    let lastFire = -Infinity;
    let spawnAcc = 0;
    let nextSpawn = rand(SPAWN_MIN, SPAWN_MAX);
    let visible = true;
    let done = false;
    let raf = 0;
    let last = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.floor(rect.width / PIXEL));
      H = Math.max(1, Math.floor(rect.height / PIXEL));
      canvas.width = W;
      canvas.height = H;
      if (shipY === 0) shipY = H / 2 - SHIP_H / 2;
      shipX = Math.min(shipX, W - SHIP_W);
      shipY = Math.min(Math.max(0, shipY), H - SHIP_H);
      if (stars.length === 0) {
        const count = Math.max(14, Math.floor((W * H) / 900));
        for (let i = 0; i < count; i++) {
          stars.push({ x: rand(0, W), y: rand(0, H), speed: rand(8, 26) });
        }
      }
    };
    resize();

    const finish = (next: Status) => {
      if (done) return;
      done = true;
      setStatus(next);
    };

    // Only trap the game keys while actually playing + on screen, so the
    // page can still be scrolled with the keyboard when it's not in use.
    const GAME_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
    const onKey = (e: KeyboardEvent, down: boolean) => {
      if (!visible || done) return;
      if (!GAME_KEYS.includes(e.key)) return;
      e.preventDefault();
      if (down) keys.add(e.key);
      else keys.delete(e.key);
    };
    const kd = (e: KeyboardEvent) => onKey(e, true);
    const ku = (e: KeyboardEvent) => onKey(e, false);
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        last = performance.now(); // avoid a huge dt on resume
        if (!visible) {
          keys.clear();
          clearMobileInput();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(canvas);

    const step = (dt: number, now: number) => {
      const dts = dt / 1000;
      const frac = elapsed / GAME_DURATION;

      // movement
      const mobile = mobileInputRef.current;
      if (isMobile && (mobile.moveX !== 0 || mobile.moveY !== 0)) {
        shipX += mobile.moveX * MOBILE_SHIP_SPEED * dts;
        shipY += mobile.moveY * MOBILE_SHIP_SPEED * dts;
      } else {
        if (keys.has("ArrowUp")) shipY -= SHIP_SPEED * dts;
        if (keys.has("ArrowDown")) shipY += SHIP_SPEED * dts;
        if (keys.has("ArrowLeft")) shipX -= SHIP_SPEED * dts;
        if (keys.has("ArrowRight")) shipX += SHIP_SPEED * dts;
      }
      shipX = Math.min(Math.max(0, shipX), W - SHIP_W);
      shipY = Math.min(Math.max(0, shipY), H - SHIP_H);

      // firing
      const wantsFire =
        (isMobile && mobile.firing) || (!isMobile && keys.has(" "));
      if (wantsFire && now - lastFire >= FIRE_COOLDOWN) {
        bullets.push({ x: shipX + SHIP_W, y: shipY + SHIP_H / 2 - SCALE / 2 });
        lastFire = now;
      }

      // bullets travel right
      for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].x += BULLET_SPEED * dts;
        if (bullets[i].x > W) bullets.splice(i, 1);
      }

      // spawn enemies from the right, ramping up over time
      spawnAcc += dt;
      if (spawnAcc >= nextSpawn) {
        spawnAcc = 0;
        nextSpawn = rand(SPAWN_MIN, SPAWN_MAX) * (1 - frac * 0.4);
        const vi = randInt(VARIANTS.length);
        const v = VARIANTS[vi];
        enemies.push({
          x: W,
          y: rand(0, H - spriteH(v.sprite, SCALE)),
          speed:
            rand(ENEMY_SPEED_MIN, ENEMY_SPEED_MAX) *
            v.speedMul *
            (1 + frac * 0.8),
          vi,
        });
      }

      // enemies travel left
      for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].x -= enemies[i].speed * dts;
        if (enemies[i].x + spriteW(VARIANTS[enemies[i].vi].sprite, SCALE) < 0) {
          enemies.splice(i, 1);
        }
      }

      // bullet vs enemy
      for (let ei = enemies.length - 1; ei >= 0; ei--) {
        const en = enemies[ei];
        const es = VARIANTS[en.vi].sprite;
        const ew = spriteW(es, SCALE);
        const eh = spriteH(es, SCALE);
        for (let bi = bullets.length - 1; bi >= 0; bi--) {
          const b = bullets[bi];
          if (overlap(b.x, b.y, SCALE * 2, SCALE, en.x, en.y, ew, eh)) {
            enemies.splice(ei, 1);
            bullets.splice(bi, 1);
            score += 1;
            break;
          }
        }
      }

      // enemy vs ship
      if (now >= invulnUntil) {
        for (let ei = enemies.length - 1; ei >= 0; ei--) {
          const en = enemies[ei];
          const es = VARIANTS[en.vi].sprite;
          if (
            overlap(
              shipX,
              shipY,
              SHIP_W,
              SHIP_H,
              en.x,
              en.y,
              spriteW(es, SCALE),
              spriteH(es, SCALE),
            )
          ) {
            enemies.splice(ei, 1);
            livesLeft -= 1;
            invulnUntil = now + INVULN;
            if (livesLeft <= 0) {
              finish("lost");
              return;
            }
            break;
          }
        }
      }

      // stars drift left for a sense of motion
      for (const s of stars) {
        s.x -= s.speed * dts;
        if (s.x < 0) {
          s.x = W;
          s.y = rand(0, H);
        }
      }

      // clock
      elapsed += dt;
      if (elapsed >= GAME_DURATION) {
        finish("won");
      }
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = COLOR_STAR;
      for (const s of stars)
        ctx.fillRect(Math.round(s.x), Math.round(s.y), 1, 1);

      ctx.fillStyle = COLOR_BULLET;
      for (const b of bullets) {
        ctx.fillRect(Math.round(b.x), Math.round(b.y), SCALE * 2, SCALE);
      }

      for (const en of enemies) {
        const v = VARIANTS[en.vi];
        drawSprite(ctx, v.sprite, en.x, en.y, v.palette, SCALE);
      }

      // blink the ship while briefly invulnerable
      const blink = now < invulnUntil && Math.floor(now / 90) % 2 === 0;
      if (!blink) {
        // flickering exhaust flame trailing off the back of the ship
        if (Math.floor(now / 70) % 2 === 0) {
          ctx.fillStyle = COLOR_FLAME;
          ctx.fillRect(
            Math.round(shipX) - SCALE * 2,
            Math.round(shipY) + SHIP_H / 2 - SCALE,
            SCALE * 2,
            SCALE * 2,
          );
        }
        drawSprite(ctx, SHIP, shipX, shipY, SHIP_PALETTE, SCALE);
      }
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(50, now - last);
      last = now;
      if (!visible || done) return;

      try {
        step(dt, now);
        if (done) return;
        draw(now);
      } catch (err) {
        // A crash in the loop must not spam or break the page — stop cleanly.
        if (process.env.NODE_ENV !== "production") {
          console.error("SpaceImpact loop error:", err);
        }
        done = true;
        cancelAnimationFrame(raf);
        return;
      }

      // mirror to React only when the displayed values actually change
      if (livesLeft !== shownLives) {
        shownLives = livesLeft;
        setLives(livesLeft);
      }
      if (score !== shownScore) {
        shownScore = score;
        setScore(score);
      }
      const sec = Math.max(0, Math.ceil((GAME_DURATION - elapsed) / 1000));
      if (sec !== shownSec) {
        shownSec = sec;
        setSecondsLeft(sec);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, [status, isMobile]);

  return (
    <div
      className={`relative h-dvh w-full overflow-hidden bg-white select-none ${status === "playing" && isMobile ? "touch-none" : ""}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full [image-rendering:pixelated]"
      />

      {status === "playing" && (
        <>
          <div className="pointer-events-none absolute left-4 top-4 font-mono text-lg leading-none tracking-widest text-black">
            {"♥".repeat(lives)}
            <span className="text-black/20">{"♥".repeat(LIVES - lives)}</span>
          </div>
          <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-2 font-mono text-sm tabular-nums text-black/60">
            <span>{score}</span>
            <span className="text-black/25">·</span>
            <span>{secondsLeft}s</span>
          </div>
          <div
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 font-mono text-[10px] font-light text-black/30 ${
              isMobile ? "" : "bottom-3"
            }`}
            style={
              isMobile ? { bottom: controlsBottomPx + 116 } : undefined
            }
          >
            {isMobile
              ? "joystick to move · hold fire to shoot"
              : "arrows to move · space to shoot"}
          </div>
          {isMobile && (
            <>
              <MobileJoystick
                inputRef={mobileInputRef}
                bottomPx={controlsBottomPx}
              />
              <button
                type="button"
                aria-label="Fire"
                className="absolute right-4 z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-black bg-white font-mono text-[10px] font-medium tracking-wider text-black touch-none select-none active:bg-black active:text-white"
                style={{ bottom: controlsBottomPx }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onPointerDown={(e) => {
                e.preventDefault();
                mobileInputRef.current.firing = true;
              }}
              onPointerUp={() => {
                mobileInputRef.current.firing = false;
              }}
              onPointerLeave={() => {
                mobileInputRef.current.firing = false;
              }}
              onPointerCancel={() => {
                mobileInputRef.current.firing = false;
              }}
            >
              FIRE
            </button>
            </>
          )}
        </>
      )}

      {status === "idle" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white px-4 text-center">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-1">
            <h3 className="font-mono text-lg font-bold tracking-wide text-black sm:text-2xl sm:tracking-widest">
              What is life if not fun?
            </h3>
          </div>
          <p className="mx-auto max-w-[min(320px,calc(100vw-32px))] font-mono text-xs font-light leading-relaxed text-black/50 sm:max-w-xs">
            {isMobile
              ? "Survive 60 seconds. Use the joystick to fly, hold fire to shoot. You have 3 lives."
              : "Survive 60 seconds. Use arrows to fly, space to shoot. You have 3 lives."}
          </p>
          <button
            onClick={start}
            className="font-mono text-sm text-black underline decoration-2 underline-offset-4 transition-colors hover:text-blue-500 cursor-pointer"
          >
            press to play
          </button>
        </div>
      )}

      {status === "won" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/70 px-4 text-center backdrop-blur-[1px]">
          <h3 className="font-mono text-2xl font-bold tracking-wide text-black sm:text-4xl sm:tracking-widest">
            You nerd!
          </h3>
          <ScoreBragForm score={score} />
          <button
            onClick={start}
            className="cursor-pointer font-mono text-sm text-black underline decoration-2 underline-offset-4 transition-colors hover:text-blue-500"
          >
            play again
          </button>
        </div>
      )}

      {status === "lost" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/70 px-4 text-center backdrop-blur-[1px]">
          <h3 className="font-mono text-2xl font-bold tracking-wide text-black sm:text-4xl sm:tracking-widest">
            Game over
          </h3>
          <button
            onClick={start}
            className="cursor-pointer font-mono text-sm text-black underline decoration-2 underline-offset-4 transition-colors hover:text-blue-500"
          >
            play again
          </button>
        </div>
      )}
    </div>
  );
}
