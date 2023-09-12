import ServiceSection from "app/components/Services/serviceSection";
import HeroLandingPage from "app/components/Shared/heroLandingPage";

export default function Services() {
    return (
      <>
        <HeroLandingPage
          h1 = {"Services"}
          perex={"I'm a martech specialist & project manager with a passion for effective digital strategies."}
          buttonText={"get to know me"}
        />
        <ServiceSection 
          title = {"How I can help your business"}
          description = {"As an experienced martech specialist, project manager and digital marketing consultant I can help you achieve your business goals."}
          buttonText = {"explore more services"}
        />
      </>
    );
  }