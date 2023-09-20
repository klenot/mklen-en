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
          h2={"This is title heading"}
          perex={
            "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          }
          buttonText={"-"}
        />
      
      </main>
    </>
  );
}
