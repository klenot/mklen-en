import HeroLandingPage from "app/components/Shared/hero-landing-page";
import ProjectSection from "app/components/Projects/project-section";
import NavBar from "app/components/Shared/nav-bar-long.jsx"
import Form from "app/components/Shared/form"

export const metadata = {
  title: "My services make your business stand out",
  description:
    "Browse through my services and discover how we can work together to achieve your goals and make a real impact in your field.",
};

export default function Projects() {
  return (
    <>
      <NavBar/>
      <HeroLandingPage
        title={"Projects"}
        sideKick={
          "I'm a martech specialist & project manager with a passion for effective digital strategies."
        }
        button={{
          text: "",
          link: ""
        }}
      />
      <ProjectSection
        title={"-"}
        description={
          "-"
        }
        button={{
          text: "cta",
          link: "",
        }}
        filters={{
          filterA: "Publish",
          categoryA: "Published",
          filterB: "Publish",
          categoryB: "Published",
        }}
      />
      <Form
        heading={"Heading 2"}
        description={"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
      />
    </>
  );
}
