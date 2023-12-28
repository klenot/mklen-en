import NavBar from "app/components/Shared/nav-bar-long";
import HeroMain from "app/components/Homepage/hero-main.jsx";
import ContentImage from "app/components/Shared/content-image";
import ServiceSection from "app/components/Services/service-section.jsx";
import BlogListSection from "app/components/Blog/blog-list-section";
import Footer from "app/components/Shared/footer-long";

export const metadata = {
  description:
    "I'm an experienced MarTech and project management professional based in Prague. I offer range of services that will help you shape your digital presence and support your business vision.",
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
            text: "Explore more",
            link: "/#explore",
          }}
        />
        <ContentImage
          anchor={"explore"}
          direction={"right"}
          heading={"Get to know each other first?"}
          text={
            "I understand, we don’t know each other yet. I would like to do a first step to change that."
          }
          image={{
            url: "/images/homepage/vending-machine-with-books.png",
            alt: "",
          }}
          button={{
            text: "Let me introduce myself",
            link: "/about",
            size: "small",
          }}
          padding={"pb-10"}
        />
        <ServiceSection
          title={"How I can help your business"}
          description={
            "As an individual with expertise in martech, project management and digital marketing I offer a rare blend of skills to your digital presence."
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
            "Writing always helps me to clarify my thoughts. Writing is the essential part of my learning process."
          }
          button={{
            text: "",
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
