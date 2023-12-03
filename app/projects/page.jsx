import HeroLandingPage from "app/components/Shared/hero-landing-page";
import ProjectSection from "app/components/Projects/project-section";
import NavBar from "app/components/Shared/nav-bar-long.jsx";
import Form from "app/components/Shared/form";
import ContentImage from "app/components/Shared/content-image.jsx";

export const metadata = {
  title: "Library of MarTech Projects",
  description:
    "Get a peek into my work. It's a collection of projects that have caught my attention or were worth revisiting. I hope you will find inspiration and insights as you check out these highlighted pieces.",
};

export default function Projects() {
  return (
    <>
      <NavBar />
      <HeroLandingPage
        title={"Projects"}
        sideKick={"Welcome to a collection of my projects."}
        button={{
          text: "",
          link: "",
        }}
      />
      <ProjectSection
        title={""}
        description={""}
        button={{
          text: "",
          link: "",
        }}
        filters={{
          filterA: "Publish",
          categoryA: "Published",
          filterB: "Publish",
          categoryB: "Published",
        }}
      />
      <ContentImage
        anchor={""}
        direction={"left"}
        padding={"pt-10"}
        heading={"Found anything intresting?"}
        text={"Let me know how feel about my projects. Who knows, one discussion may even lead to finishing a great project together."}
        button={{
          text: "",
          link: "",
        }}
        image={{
          url: "/images/projects/robot-reading illustration-on-a-purple-chair.png",
          alt: "A lime-paste-green humanoid is sitting in an dark-purple armchair reading a two page list in a very calm manner.",
        }}
      />
      <Form heading={"Get in touch 🙏🏻"} description={""} />
    </>
  );
}
