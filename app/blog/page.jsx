import HeroLandingPage from "app/components/Shared/heroLandingPage.jsx";
import BlogTileSection from "app/components/Blog/blogTileSection.jsx";

export default function Blog() {
  return (
    <>
      <main>
        
        <HeroLandingPage
          h1={"Writing"}
          perex={
            "The process of writing always reminds me of how little I actually know about the topic."
          }
          buttonText={"-"}
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
