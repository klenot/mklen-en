import HeroMain from "app/components/Homepage/heroMain.jsx";
import ServiceSection from "app/components/Services/serviceSection";
import BlogListSection from "app/components/Blog/blogListSection";
import Footer from "./components/Shared/footer";

export const metadata = {
  description:
    "As someone who's been in the world of marketing tech and project management for a while, I'm here to share my insights and know-how with you.",
};

export default function Home() {
  return (
    <>
      <main>
        <HeroMain
          title={"I'm Marek"}
          sideKick={
            "I'm a martech specialist & project manager with a passion for effective digital strategies."
          }
          button={{
            text:"Get to know me",
          }}
        />
        <ServiceSection
          title={"How I can help your business"}
          description={
            "As an experienced martech specialist, project manager and digital marketing consultant I can help you achieve your business goals."
          }
          button={{
            text: "Explore all services",
            link: "/services",
          }}
          filters={{
            filterA: "Publish",
            categoryA: "Published",
            filterB: "Placement",
            categoryB: "Homepage",
          }}
        />
        <BlogListSection
          title={"Writing"}
          perex={
            "When I'm getting into a new subject or reflecting on my experiences, writing helps me to clarify my thoughts and better understand the topic. Writing is the essential part of my learning process."
          }
          button={{
            text: "More writings",
            link: "/blog",
          }}
          filters={{
            filterA: "Publish",
            categoryA: "Published",
            filterB: "Placement",
            categoryB: "Homepage",
          }}
        />
      </main>
      <Footer />
    </>
  );
}
