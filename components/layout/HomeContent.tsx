"use client";

import { ViewModeProvider } from "@/hooks/useViewMode";
import ViewToggle from "@/components/layout/ViewToggle";
import ForMachinesView from "@/components/sections/ForMachinesView";
import FirstPanel from "@/components/layout/FirstPanel";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Blog from "@/components/sections/Blog";
import GameSection from "@/components/game/GameSection";
import Experiences from "@/components/sections/Experiences";
import HeroServicesPath from "@/components/sections/HeroServicesPath";
import Projects from "@/components/sections/Projects";
import Reviews from "@/components/sections/Reviews";

export default function HomeContent() {
  return (
    <ViewModeProvider>
      <ViewToggle />
      <ForMachinesView />
      <main className="bg-white">
        <div className="relative">
          <section className="sticky top-0 z-0 min-h-dvh bg-white flex flex-col items-center justify-center">
            <Projects />
            <Blog />
          </section>

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
              <HeroServicesPath />

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

        <GameSection />

        <Footer />
      </main>
    </ViewModeProvider>
  );
}
