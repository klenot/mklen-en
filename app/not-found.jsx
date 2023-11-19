import HeroLandingPage from "app/components/Shared/hero-landing-page"

export default function NotFound() {
  return (
    <>
    <div className="not-found">
      <HeroLandingPage 
        title={"404: The Click Wormhole"}
        sideKick={"Your click might have accidentally fallen into a wormhole leading to a parallel cat meme vortex dimension. Click below to return to the homepage and leave this purr-fectly weird dimension behind!"}
        button={{
          text:"Head back to reality",
          link:"/",
        }}
      />
      </div>
    </>
  )
}