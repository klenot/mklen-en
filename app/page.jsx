import HeroMain from "app/components/Shared/heroMain.jsx";
import ServiceSectionHome from "app/components/Services/serviceSectionHome";
import BlogListSection from "app/components/Blog/blogListSection";
import Footer from "./components/Shared/footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroMain 
          h1={"My name is Marek."}
          perex={"I'm a martech specialist & project manager with a passion for effective digital strategies."}
          buttonText={"get to know me"}
        />
        <ServiceSectionHome
          title={"How I can help your business"}
          description={"As an experienced martech specialist, project manager and digital marketing consultant I can help you achieve your business goals."}
          buttonText={"explore all services"}
        />
        <BlogListSection 
          h2={"Writing"}
          perex={"When I'm getting into a new subject or reflecting on my experiences, writing helps me to clarify my thoughts and better understand the topic. Writing is the essential part of my learning process."}
          buttonText={"more writings"}
        />
      </main>

      <Footer />

    </>
  );
}