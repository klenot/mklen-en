import HeroLandingPage from "app/components/Shared/heroLandingPage";
import SkillRepeater from "app/components/Skills/skillRepeater";
import BookRepeater from "app/components/Books/bookRepeater";
import 'styles/about-styles.css'

export const metadata = {
  title: "Get to know me",
  description: "I'm a experienced marktech consultant & PMI certified project manager. Find out all about my skills and projects in five minutes on my about page.",
}

export default function About() {
  return (
    <>
      <main>
        <HeroLandingPage 
          h1={"About"}
          perex={"Helping companies create effective digital presence is what I’ve been doing for the last 6 years working as a marketing consultant & project manager."}
          buttonText={"Curriculum vitae"}
          buttonUrl={"about/cv"}
        />
        <SkillRepeater />

        <section id='interest-section' className="pb-10">
          <div className='interest-container'>
            <div className='iterest-section'>
              <h2>Interests</h2>
            </div>
            <div className='iterest-section-wrapper'>
              <div className='interest-item text-align-left'>
                <p>Photography</p>
                <p>Traveling</p>
                <p>Podcasts</p>
                <p>Music</p>
              </div>
              <div className='interest-item text-align-center'>
                <p>Chess</p>
                <p>Elevate</p>
                <p>Duolingo</p>
                <p>Reading</p>
              </div>
              <div className='interest-item text-align-right'>
                <p>Running</p>
                <p>Badminton</p>
                <p>Meditation</p>
                <p>Crowdy streets</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
