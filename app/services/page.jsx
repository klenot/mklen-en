import ServiceSection from "app/components/Services/serviceSection";
import HeroLandingPage from "app/components/Shared/heroLandingPage";

export default function Services() {
    return (
      <>
        <HeroLandingPage
          h1 = {"Services"}
          perex={"I'm a martech specialist & project manager with a passion for effective digital strategies."}
          buttonText={"-"}
        />
        <ServiceSection 
          title = {"-"}
          description = {"-"}
          buttonText = {"-"}
        />
      </>
    );
  }