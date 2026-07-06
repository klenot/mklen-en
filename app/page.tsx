import HomeContent from "@/components/layout/HomeContent";
import Blog from "@/components/sections/Blog";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return <HomeContent blogSection={<Blog />} projectsSection={<Projects />} />;
}
