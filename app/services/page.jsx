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
          title = {"This is title headign"}
          description = {"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
          buttonText = {"-"}
        />
        <div className="pb-5"></div>
      </>
    );
  }