import "styles/about-styles.css";
import HeroLandingPage from "app/components/Shared/hero-landing-page";
import ContentImage from "app/components/Shared/content-image";
import TextBlock from "app/components/Shared/text-block";

export const metadata = {
  title: "I aim for and efficient cooperation",
  description:
    "I'm a experienced marktech consultant & PMI certified project manager. Find out all about my skills and projects in five minutes on my about page.",
};

export default function Cooperation() {
  return (
    <>
      <main>
        <HeroLandingPage
          title={"Work in progress"}
          sideKick={"I am wokring on defining my cooperation guidelines."}
          button={{
            text:"Back to homepage",
            link:"/",
          }}
        />
      </main>
    </>
  );
}
