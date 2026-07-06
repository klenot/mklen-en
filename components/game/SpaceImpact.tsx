"use client";

import { useEffect, useRef, useState } from "react";

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

// tuning knobs
const PIXEL = 4; // css px per rendered game pixel (chunky retro look)
const SCALE = 3; // game px per sprite cell
const LIVES = 3;
const GAME_DURATION = 60_000; // survive this long (ms) to win
const FIRE_COOLDOWN = 240; // ms between shots
const SHIP_SPEED = 115; // game px / second
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

const spriteW = (s: Sprite) => s[0].length * SCALE;
const spriteH = (s: Sprite) => s.length * SCALE;

const SHIP_W = spriteW(SHIP);
const SHIP_H = spriteH(SHIP);

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
) {
  const px = Math.round(x);
  const py = Math.round(y);
  for (let r = 0; r < sprite.length; r++) {
    const row = sprite[r];
    for (let c = 0; c < row.length; c++) {
      const color = palette[row[c]];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(px + c * SCALE, py + r * SCALE, SCALE, SCALE);
    }
  }
}

export default function SpaceImpact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [lives, setLives] = useState(LIVES);
  const [secondsLeft, setSecondsLeft] = useState(GAME_DURATION / 1000);

  const start = () => {
    setLives(LIVES);
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
    let shownLives = LIVES;
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
        if (!visible) keys.clear();
      },
      { threshold: 0.35 },
    );
    io.observe(canvas);

    const step = (dt: number, now: number) => {
      const dts = dt / 1000;
      const frac = elapsed / GAME_DURATION;

      // movement
      if (keys.has("ArrowUp")) shipY -= SHIP_SPEED * dts;
      if (keys.has("ArrowDown")) shipY += SHIP_SPEED * dts;
      if (keys.has("ArrowLeft")) shipX -= SHIP_SPEED * dts;
      if (keys.has("ArrowRight")) shipX += SHIP_SPEED * dts;
      shipX = Math.min(Math.max(0, shipX), W - SHIP_W);
      shipY = Math.min(Math.max(0, shipY), H - SHIP_H);

      // firing
      if (keys.has(" ") && now - lastFire >= FIRE_COOLDOWN) {
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
          y: rand(0, H - spriteH(v.sprite)),
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
        if (enemies[i].x + spriteW(VARIANTS[enemies[i].vi].sprite) < 0) {
          enemies.splice(i, 1);
        }
      }

      // bullet vs enemy
      for (let ei = enemies.length - 1; ei >= 0; ei--) {
        const en = enemies[ei];
        const es = VARIANTS[en.vi].sprite;
        const ew = spriteW(es);
        const eh = spriteH(es);
        for (let bi = bullets.length - 1; bi >= 0; bi--) {
          const b = bullets[bi];
          if (overlap(b.x, b.y, SCALE * 2, SCALE, en.x, en.y, ew, eh)) {
            enemies.splice(ei, 1);
            bullets.splice(bi, 1);
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
              spriteW(es),
              spriteH(es),
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
        drawSprite(ctx, v.sprite, en.x, en.y, v.palette);
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
        drawSprite(ctx, SHIP, shipX, shipY, SHIP_PALETTE);
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
  }, [status]);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-white select-none">
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
          <div className="pointer-events-none absolute right-4 top-4 font-mono text-sm tabular-nums text-black/60">
            {secondsLeft}s
          </div>
          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] font-light text-black/30">
            arrows to move · space to shoot
          </div>
        </>
      )}

      {status === "idle" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white text-center">
          <div className="flex flex-col items-center gap-1">
            <p className="font-sans text-xs italic text-black">
              are you ready for
            </p>
            <h3 className="font-mono text-2xl font-bold tracking-widest text-black">
              SPACE IMPACT
            </h3>
          </div>
          <p className="max-w-xs font-mono text-xs font-light text-black/50">
            survive 60 seconds. arrows to fly, space to shoot. you have 3 lives.
          </p>
          <button
            onClick={start}
            className="font-mono text-sm text-black underline decoration-2 underline-offset-4 transition-colors hover:text-blue-500"
          >
            press to play
          </button>
        </div>
      )}

      {(status === "won" || status === "lost") && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/70 text-center backdrop-blur-[1px]">
          <h3 className="font-mono text-4xl font-bold tracking-widest text-black">
            {status === "won" ? "You nerd!" : "Game over"}
          </h3>
          <button
            onClick={start}
            className="font-mono text-sm text-black underline decoration-2 underline-offset-4 transition-colors hover:text-blue-500"
          >
            play again
          </button>
        </div>
      )}
    </div>
  );
}
