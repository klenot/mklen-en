import HeroLandingPage from "app/components/Shared/heroLandingPage";

export const metadata = {
  title: "Message has been sent",
  description:
    "Your message is on its way to me. I am going to respond as soon as I read it.",
};

export default function MessageSent() {
  return (
    <>
      <div className='message-sent'>
        <HeroLandingPage
          title={"Message has been sent"}
          sideKick={
            "Your message is on its way to me. I am going to respond as soon as I read it."
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
