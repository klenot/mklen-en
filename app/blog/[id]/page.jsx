import HeroLandingPage from "app/components/Shared/heroLandingPage";

export default function Post({ params }) {

  console.log(params)

  return (
    <>
      <HeroLandingPage
        h1={"test"}
        perex={"test"}
        buttonText={"test"}></HeroLandingPage>
    </>
  );
}
