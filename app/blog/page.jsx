import HeroLandingPage from "@/app/components/Shared/heroLandingPage";
import BlogTileSection from "@/app/components/Blog/blogTileSection";

export default function Blog() {
  return (
    <>
      <main>
        
        <HeroLandingPage
          h1={"Writing"}
          perex={
            "The process of writing always reminds me of how little I actually know about the topic."
          }
          buttonText={"All posts"}
        />

        <BlogTileSection 
          h2={"Writing"}
          perex={
            "The process of writing always reminds me of how little I actually know about the topic."
          }
          buttonText={"more writings"}
        />
      
      </main>
    </>
  );
}
