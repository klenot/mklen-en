import Link from "next/link";

export default function HeroLandingPage({ title, sideKick, button }) {
  return (
    <section className="hero-section-landing-page" id='hero-section'>
      <div className='hero-container-landing-page'>
        <div className='hero-section'>
          <h1>
            <span className='hero-claim'>
              <span className='hero-claim'>{title}</span>
            </span>
          </h1>
        </div>
        {sideKick === "" ? null : <div className='hero-section'>
          <div>
            <p className='hero-perex'>{sideKick}</p>
          </div>
        </div>}
        {button.text === "" ? (
          null
        ) : (
          <div className='hero-section'>
            <button onClick={() => umami.track(`${button.text}`)} className='cta ctaLarge'>
              {button.link === "" ? (
                <Link href={"/"}>
                  <span className="button-text">{button.text}</span>
                </Link>
              ) : (
                <Link href={`/${button.link}`}>
                  <span className="button-text">{button.text}</span>
                </Link>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
