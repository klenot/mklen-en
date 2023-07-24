import HeroMain from "components/heroMain.jsx"
import TileRepeater from "@/components/tileRepeater"

export default function Blog() {
    return (
      <>
        <main>
            <HeroMain />
            <TileRepeater />
            <section id="text-section-one-column">
                <div className="text-section-container">
                    <div className="text-section text-section-title-h2">
                        <h2>Final thoughts before you leave</h2>
                    </div>
                    <div className="text-section">
                        <p>
                            The process of writing always reminds me of how little I actually know
                            about the topic.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    </>
    )
  }