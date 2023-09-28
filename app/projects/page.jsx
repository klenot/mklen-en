import HeroLandingPage from "app/components/Shared/heroLandingPage";
import ContentImage from "app/components/Shared/contentImage";
import ProjectSection from "app/components/Projects/projectSection";
import TextBlock from "app/components/Shared/textBlock";
import Form from "app/components/Shared/form"

export const metadata = {
  title: "My services make your business stand out",
  description:
    "Browse through my services and discover how we can work together to achieve your goals and make a real impact in your field.",
};

export default function Projects() {
  return (
    <>
      <HeroLandingPage
        h1={"Projects"}
        perex={
          "I'm a martech specialist & project manager with a passion for effective digital strategies."
        }
        buttonText={"-"}
      />
      <ContentImage
        direction={"right"}
        heading={"Heading 2"}
        text={
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nunc tincidunt ante vitae massa. Etiam dictum tincidunt diam. Curabitur vitae diam non enim vestibulum interdum. Morbi scelerisque luctus velit."
        }
        image={{
          url: "/images/projects/ilu-test.png",
          alt: "Alt text.",
        }}
      />
      <ProjectSection
        title={"This is title heading"}
        description={
          "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
        buttonText={"-"}
      />
      <TextBlock
        heading={"Heading 2"}
        text={
          "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
      />
      <Form heading={"Get in touch."} />
    </>
  );
}
