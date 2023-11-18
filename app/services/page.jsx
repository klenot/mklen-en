import NavBar from "app/components/Shared/nav-bar-long";
import ServiceSection from "app/components/Services/service-section.jsx";
import HeroLandingPage from "app/components/Shared/hero-landing-page";

export const metadata = {
  title: "My services make your business stand out",
  description:
    "Browse through my services and discover how we can work together to achieve your goals and make a real impact in your field.",
};

export default function Services() {
  return (
    <>
      <NavBar/>
      <HeroLandingPage
        title={"Services"}
        sideKick={
          "You can chose from a variation of services from digital marketing strategies to tailoring your company processes by a certified project manager."
        }
        button={{
          text: "",
          link: ""
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
