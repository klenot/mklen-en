import HeroMain from "components/heroMain.jsx"
import ServiceRepeater from "@/components/serviceRepeater"
import BlogRepeater from "@/components/blogRepeater"

export default function Home() {
  return (
    <>
      <main>
          <HeroMain />
          <ServiceRepeater />
          <BlogRepeater />
      </main>
  </>
  )
}
