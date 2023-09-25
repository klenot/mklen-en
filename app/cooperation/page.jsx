import HeroLandingPage from "app/components/Shared/heroLandingPage";
import SkillRepeater from "app/components/Skills/skillRepeater";
import BookRepeater from "app/components/Books/bookRepeater";
import 'styles/about-styles.css'

export const metadata = {
  title: "I aim for and efficient cooperation",
  description: "I'm a experienced marktech consultant & PMI certified project manager. Find out all about my skills and projects in five minutes on my about page.",
}

export default function Cooperation() {
  return (
    <>
      <main>
        <HeroLandingPage 
          h1={"Cooperation guidelines"}
          perex={"Helping companies create effective digital presence is what I’ve been doing for the last 6 years working as a marketing consultant & project manager."}
          buttonText={"-"}
          buttonUrl={"about/cv"}
        />
      </main>
    </>
  );
}
