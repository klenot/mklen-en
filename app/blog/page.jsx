import NavBar from "app/components/Shared/nav-bar-long";
import HeroLandingPage from "app/components/Shared/hero-landing-page.jsx";
import BlogTileSection from "app/components/Blog/blog-tile-section.jsx";
import ShortFooter from "app/components/Shared/footer-short.jsx";

export const metadata = {
  title: "Read through my thoughts about digital marekting and project management",
  description: "As someone who's been in the world of marketing tech and project management for a while, I'm here to share my insights and know-how with you.",
}

export default function Blog() {
  return (
    <>
      <main>
        <NavBar/>
        <HeroLandingPage
          title={"Writing"}
          sideKick={
            "My focus is on helping you navigate through broad topics of project management and digital marketing."
          }
          button={{
            text:"-",
            link: "-",
          }}
        />
        
        <BlogTileSection 
          h2={"-"}
          perex={
            "-"
          }
          buttonText={"-"}
        />
      
      </main>
      <ShortFooter/>
    </>
  );
}
