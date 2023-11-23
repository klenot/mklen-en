import NavBar from "app/components/Shared/nav-bar-long";
import HeroLandingPage from "app/components/Shared/hero-landing-page.jsx";
import BlogTileSection from "app/components/Blog/blog-tile-section.jsx";
import ContentImage from "app/components/Shared/content-image";
import ShortFooter from "app/components/Shared/footer-short.jsx";
import Form from "app/components/Shared/form.jsx";

export const metadata = {
  title:
    "Writing",
  description:
    "Get some heads up on project management, digital marketing and martech. Because let's face it, navigating through these tasks without a clue is like trying to herd cats - entertaining for onlookers, but not the most effective strategy for success.",
};

export default function Blog() {
  return (
    <>
      <main>
        <NavBar />
        <HeroLandingPage
          title={"Writing"}
          sideKick={
            "We are basically digitalising our thoughts by blogging, aren’t we?"
          }
          button={{
            text: "",
            link: "",
          }}
        />

        <BlogTileSection h2={""} perex={""} buttonText={""} />
        <ContentImage
          anchor={"explore"}
          direction={"right"}
          heading={"Thanks for the visit 👋🏻"}
          text={
            "My focus is on making chosen topics more understandable for others, but mostly because I just need to get my thoughts straight about something. That’s why I could be wrong. If you have any suggestions or questions, please, let me know. 🙏🏻"
          }
          image={{
            url: "/images/blog/robot-reading illustration-on-a-green-chair.png",
            alt: "A robot sitting in a cozy chair reading his favourite blog post.",
          }}
          button={{
            text: "",
            link: "/project",
            size: "small",
          }}
          padding={"pt-10"}
        />
      </main>
      <ShortFooter/>
    </>
  );
}
