import ServiceSection from "app/components/Services/serviceSection";
import HeroLandingPage from "app/components/Shared/heroLandingPage";
import Form from "app/components/Shared/form";
import TextBlock from "app/components/Shared/textBlock";

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
          "You can chose from a variation of services from digital marketing strategies to tailoring your company processes by a certified project manager."
        }
        button={{
          text: "-",
          link: "-"
        }}
      />
      <ServiceSection
        title={"-"}
        description={
          "-"
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
    </>
  );
}
