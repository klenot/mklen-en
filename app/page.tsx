import FirstPanel from "@/components/layout/FirstPanel";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Experiences from "@/components/sections/Experiences";
import Hero from "@/components/sections/Hero";
import PathAnimation from "@/components/sections/PathAnimation";
import Projects from "@/components/sections/Projects";
import Reviews from "@/components/sections/Reviews";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <main className="bg-white">
      {/* Reveal stage: the 2nd panel is a single sticky screen (Projects) pinned
          behind, uncovered as the 1st panel peels away. It must stay ~one viewport
          tall — taller content here re-exposes the transparent scroll spacers below
          it (footer would slide over empty gaps), so anything that scrolls past the
          fold lives after this stage in normal flow instead. */}
      <div className="relative">
        <section
          id="2nd-panel"
          className="sticky top-0 z-0 min-h-dvh bg-white flex flex-col items-center justify-center"
        >
          <Projects />
          <Blog />
        </section>

        {/* 1st panel: overlays from the very top (z-10) and scrolls away, uncovering
            the pinned 2nd panel. Absolutely positioned so the overlap doesn't depend
            on the 2nd panel's height; its scroll track is auto-synced to its measured
            height, so adding sections here never hides the 2nd panel. */}
        <FirstPanel>
          <div className="flex items-center justify-center w-full sticky top-0 z-0">
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

      {/* Contact stage: its own single sticky screen, pinned while the footer slides
          up over it. The footer's spacer lives in this container so Contact stays
          pinned for exactly the footer's reveal distance. Keep this ~one viewport
          tall for the same reason as the reveal stage above. */}
      <div className="relative">
        <div className="sticky top-0 z-0 min-h-dvh bg-white flex flex-col items-center justify-center">
          <Contact />
        </div>

        {/* Footer: hidden below the fold, slides up over the pinned Contact screen. */}
        <Footer />
      </div>
    </main>
  );
}
