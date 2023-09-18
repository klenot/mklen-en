import HeroLandingPage from "app/components/Shared/heroLandingPage";
import SkillRepeater from "app/components/Skills/skillRepeater";
import BookRepeater from "app/components/Books/bookRepeater";
import 'styles/about-styles.css'

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
        <BookRepeater />

        <section id='interest-section'>
          <div className='interest-container'>
            <div className='iterest-section'>
              <h2>Interests</h2>
            </div>
            <div className='iterest-section-wrapper'>
              <div className='interest-item text-align-left'>
                <p>Photography</p>
                <p>Music</p>
              </div>
              <div className='interest-item text-align-center'>
                <p>Chess</p>
                <p>Learning guitar</p>
              </div>
              <div className='interest-item text-align-right'>
                <p>Traveling</p>
                <p>Badminton</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
