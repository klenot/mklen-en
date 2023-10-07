import ServiceSection from "app/components/Services/serviceSection";
import HeroLandingPage from "app/components/Shared/heroLandingPage";

export const metadata = {
  title: "My services make your business stand out",
  description:
    "Browse through my services and discover how we can work together to achieve your goals and make a real impact in your field.",
};

export default function Services() {
  return (
    <>
      <HeroLandingPage
        title={"Services"}
        sideKick={
          "I'm a martech specialist & project manager with a passion for effective digital strategies."
        }
        button={{
          text: "-",
          link: "-"
        }}
      />
      <ServiceSection
        title={"This is title heading"}
        description={
          "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
        button={{
          text: "-",
          link: ""
        }}
        filters={{
          filterA: "Publish",
          categoryA: "Published",
          filterB: "Publish",
          categoryB: "Published",
        }}
      />
      <div className='pb-5'></div>
    </>
  );
}
