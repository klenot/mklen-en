import NavBar from "app/components/Shared/nav-bar-long";
import HeroMain from "app/components/Homepage/hero-main.jsx";
import ContentImage from "app/components/Shared/content-image";
import ServiceSection from "app/components/Services/service-section.jsx";
import BlogListSection from "app/components/Blog/blog-list-section";
import Footer from "app/components/Shared/footer-long";

export const metadata = {
  description:
    "As someone who's been in the world of marketing tech and project management for a while, I'm here to share my insights and know-how with you.",
};

export default function Home() {
  return (
    <>
      <main>
        <NavBar />
        <HeroMain
          title={"My name is Marek"}
          sideKick={
            "I'm a MarTech specialist with a passion for effective digital strategies."
          }
          button={{
            text:"Explore more",
            link:"/#explore",
          }}
        />
        <ContentImage
        anchor={"explore"}
        direction={"right"}
        heading={"How I can help your business"}
        text={"As a professional with expertise in Martech, Project Management, and Digital Marketing I offer a rare brew of skills to your digital presence."}
        image={{
          url:"/images/dev/hackathon-transparent.webp",
          alt:"",
        }}
        button={{
          text: "Get to know me",
          link: "/about",
          size: "small",
        }}
        />
        <ServiceSection
          title={"How I can help your business"}
          description={
            "As a professional with expertise in Martech, Project Management, and Digital Marketing I offer a rare brew of skills to your digital presence. Let's work together and bring life to your ideas."
          }
          button={{
            text: "All services",
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
            "When I'm getting into a new subject or reflecting on my past experiences, writing always helps me to clarify my thoughts. The goal is to better understand the topic. Writing is the essential part of a learning process."
          }
          button={{
            text: "More posts",
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
