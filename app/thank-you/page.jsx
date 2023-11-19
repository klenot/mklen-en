import HeroLandingPage from "app/components/Shared/hero-landing-page";

export const metadata = {
  title: "Thank You",
  description:
    "Lorem ipsum is a text",
};

export default function ThankYou() {
  return (
    <>
      <div className='thank-you'>
        <HeroLandingPage
          title={"Thank you"}
          sideKick={
            "Lorem ipsum is a text.Lorem ipsum is a text.Lorem ipsum is a text.Lorem ipsum is a text.Lorem ipsum is a text."
          }
          button={{
            text: "Back to homepage",
            link: "/",
          }}
        />
      </div>
    </>
  );
}
