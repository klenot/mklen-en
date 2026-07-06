"use client";

import type { ReactNode } from "react";
import { ViewModeProvider } from "@/hooks/useViewMode";
import ForMachinesView from "@/components/sections/ForMachinesView";
import FirstPanel from "@/components/layout/FirstPanel";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import GameSection from "@/components/game/GameSection";
import Experiences from "@/components/sections/Experiences";
import HeroServicesPath from "@/components/sections/HeroServicesPath";
import Reviews from "@/components/sections/Reviews";

export default function HomeContent({
  blogSection,
  projectsSection,
}: {
  blogSection: ReactNode;
  projectsSection: ReactNode;
}) {
  return (
    <ViewModeProvider>
      <ForMachinesView />
      <main className="bg-white">
        <div className="relative">
          <section className="sticky top-0 z-0 min-h-dvh bg-white flex flex-col items-center justify-center">
            {projectsSection}
            {blogSection}
          </section>

          <FirstPanel>
            <div className="flex items-center justify-start w-full sticky top-0 z-0 bg-white">
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
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-b-3xl"
                  style={{
                    backgroundImage: "url('/bg-gradient-long.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    maskImage:
                      "linear-gradient(to bottom, transparent 0%, black 30%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent 0%, black 30%)",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-b-3xl mix-blend-multiply"
                  style={{
                    background: "linear-gradient(to bottom, #0082FF, #110058)",
                    maskImage:
                      "linear-gradient(to bottom, transparent 0%, black 30%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent 0%, black 30%)",
                  }}
                />
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

        <div className="relative z-10 bg-white">
          <GameSection />
        </div>

        <Footer />
      </main>
    </ViewModeProvider>
  );
}
