import HeroLandingPage from "@/components/Shared/heroLandingPage";
import SkillRepeater from "@/components/Skills/skillRepeater";
import TileRepeater from "@/components/Books/bookRepeater";
import 'styles/about-styles.css'

export default function About() {
  return (
    <>
      <main>
        <HeroLandingPage 
          h1={"About"}
          perex={"I am Marek."}
          buttonText={"get to know me"}
        />
        <SkillRepeater />
        <TileRepeater />

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
