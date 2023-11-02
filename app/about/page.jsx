import HeroLandingPage from "app/components/Shared/heroLandingPage";
import ContentImage from "app/components/Shared/contentImage";
import SkillRepeater from "app/components/Skills/skillRepeater";
import BookRepeater from "app/components/Books/bookRepeater";
import "styles/about-styles.css";

export const metadata = {
  title: "Get to know me",
  description:
    "I'm a experienced marktech consultant & PMI certified project manager. Find out all about my skills and projects in five minutes on my about page.",
};

export default function About() {
  return (
    <>
      <main>
        <HeroLandingPage
          title={"About"}
          sideKick={
            "Helping companies create effective digital presence is what I’ve been doing for the last seven years."
          }
          button={{
            text: "-",
            link: "-",
          }}
        />
        <ContentImage
          anchor={"explore"}
          direction={"left"}
          heading={"Career"}
          text={
            "Every path is different. If you want to learn more about mine continue to my cv page."
          }
          image={{
            url: "/images/dev/hackathon-transparent.webp",
            alt: "",
          }}
          button={{
            text: "Curriculum vitae",
            link: "/about/cv",
          }}
          padding={"none"}
        />
        <SkillRepeater />
        <BookRepeater
          heading={"Reading"}
          description={
            "I am not fast nor a heavy reader, but I do enjoy reading. Do you have any interesting books to discuss?"
          }
        />
        <section id='interest-section' className='pt-10 pb-10'>
          <div className='interest-container'>
            <div className='iterest-section'>
              <h2>Interests</h2>
            </div>
            <div className='iterest-section-wrapper'>
              <div className='interest-item text-align-left'>
                <p>Photography</p>
                <p>Traveling</p>
                <p>Podcasts</p>
                <p>Movies</p>
                <p>Music</p>
              </div>
              <div className='interest-item text-align-center'>
                <p>Chess</p>
                <p>Elevate</p>
                <p>Duolingo</p>
                <p>Learning</p>
                <p>Reading</p>
              </div>
              <div className='interest-item text-align-right'>
                <p>Surfing</p>
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
