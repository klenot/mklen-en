import HeroLandingPage from "app/components/Shared/heroLandingPage.jsx";
import BlogTileSection from "app/components/Blog/blogTileSection.jsx";

export const metadata = {
  title: "Read through my thoughts about digital marekting and project management",
  description: "As someone who's been in the world of marketing tech and project management for a while, I'm here to share my insights and know-how with you.",
}

export default function Blog() {
  return (
    <>
      <main>
        
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
    </>
  );
}
