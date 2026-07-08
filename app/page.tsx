import { Suspense } from "react";
import HomeContent from "@/components/layout/HomeContent";
import Blog from "@/components/sections/Blog";
import Projects from "@/components/sections/Projects";
import BlogSectionSkeleton from "@/components/sections/BlogSectionSkeleton";
import ProjectsSectionSkeleton from "@/components/sections/ProjectsSectionSkeleton";

export default function Home() {
  return (
    <HomeContent
      blogSection={
        <Suspense fallback={<BlogSectionSkeleton />}>
          <Blog />
        </Suspense>
      }
      projectsSection={
        <Suspense fallback={<ProjectsSectionSkeleton />}>
          <Projects />
        </Suspense>
      }
    />
  );
}
