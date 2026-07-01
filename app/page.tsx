import Navbar from "@/components/layout/Navbar";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <main className="bg-black">
      <div className="relative">
        {/* pinned behind */}
        {/* panel is h-dvh → this is what pins, this is the parallax track */}
        <section className="sticky top-0 h-dvh bg-white flex flex-col items-center justify-center">
          {/* Projects is content-sized, centered in the panel */}
          <Projects />
        </section>

        {/* on top, scrolls away — now with internal navbar + content */}
        <section className="relative mt-[-100vh]">
          <div className="sticky top-0 z-0">
            <Navbar />
          </div>
          <div className="relative z-10 h-screen bg-orange-400 rounded-3xl" />
        </section>

        <div className="h-screen" aria-hidden />
      </div>
    </main>
  );
}
