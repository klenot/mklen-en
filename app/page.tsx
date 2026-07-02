import FirstPanel from "@/components/layout/FirstPanel";
import Footer from "@/components/layout/Footer";
import ContactOverlay from "@/components/layout/ContactOverlay";
import Navbar from "@/components/layout/Navbar";
import Blog from "@/components/sections/Blog";
import GameSection from "@/components/game/GameSection";
import Contact from "@/components/sections/Contact";
import Experiences from "@/components/sections/Experiences";
import HeroServices from "@/components/sections/HeroServices";
import PathAnimation from "@/components/sections/PathAnimation";
import Projects from "@/components/sections/Projects";
import Reviews from "@/components/sections/Reviews";

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
          <div
            className="relative z-10 rounded-3xl"
            style={{
              background: "linear-gradient(to bottom, #0082FF, #110058)",
            }}
          >
            <HeroServices />
            <PathAnimation />

            {/* Reviews stage: the glass Experiences panel sticks as a ceiling
                (z-30) while the Reviews section (z-10) scrolls its 3D cards up
                from the bottom edge. The cards pass behind the glass, so its
                backdrop-blur smears them as they slip under and off the top. */}
            <div className="relative pb-6">
              <div className="sticky top-4 z-30">
                <Experiences />
              </div>
              <div className="relative z-10">
                <Reviews />
              </div>
            </div>
          </div>
        </FirstPanel>
      </div>

      {/* Playful breather between the blog and contact stages: a self-contained
          mini game. Isolated under components/game and wrapped in an error
          boundary so it can never take the rest of the page down. */}
      <GameSection />

      {/* Contact stage: Contact is fixed (z-40 > z-30) and only fades in once
          the game section is fully scrolled off-screen. The spacer provides enough
          scroll room for the game to leave the viewport before the footer arrives. */}
      <div className="relative">
        <div className="h-[80vh]" aria-hidden />
        <ContactOverlay afterSelector="#game">
          <Contact />
        </ContactOverlay>

        {/* Footer: slides up over the white background, but under the Contact content. */}
        <Footer />
      </div>
    </main>
  );
}
