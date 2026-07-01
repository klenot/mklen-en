import FirstPanel from "@/components/layout/FirstPanel";
import Navbar from "@/components/layout/Navbar";
import Experiences from "@/components/sections/Experiences";
import Hero from "@/components/sections/Hero";
import PathAnimation from "@/components/sections/PathAnimation";
import Projects from "@/components/sections/Projects";
import Reviews from "@/components/sections/Reviews";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <main className="bg-black">
      <div className="relative">
        {/* 2nd panel: pinned behind. min-h-dvh → fills the viewport and centers when the
            content is short (desktop), but grows to its natural height and scrolls through
            when the content is taller than the viewport (mobile/tablet) — no clipping. */}
        <section
          id="2nd-panel"
          className="sticky top-0 z-0 min-h-dvh bg-white flex flex-col items-center justify-center"
        >
          <Projects />
        </section>

        {/* 1st panel: overlays from the very top (z-10) and scrolls away, uncovering the
            pinned 2nd panel. Absolutely positioned so the overlap doesn't depend on the
            2nd panel's height; its scroll track is auto-synced to its measured height, so
            adding sections here never hides the 2nd panel. */}
        <FirstPanel>
          <div className="sticky top-0 z-0">
            <Navbar />
          </div>
          <div className="relative z-10 bg-orange-400 rounded-3xl">
            <Hero />
            <Services />
            <PathAnimation />
            <Experiences />
            <Reviews />
          </div>
        </FirstPanel>
      </div>
    </main>
  );
}
