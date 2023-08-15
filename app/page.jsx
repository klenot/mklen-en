import HeroMain from "components/Shared/heroMain.jsx";
import ServiceRepeater from "@/components/services/serviceRepeater";
import BlogRepeater from "@/components/Blog/blogRepeater";

export default function Home() {
  return (
    <>
      <main>
        <HeroMain />
        <ServiceRepeater />
        <BlogRepeater />
      </main>
    </>
  );
}
