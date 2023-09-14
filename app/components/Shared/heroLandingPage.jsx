import Link from "next/link";

export default function HeroLandingPage({ h1, perex, buttonText, buttonUrl }) {
  return (
    <section id='hero-section'>
      <div className='hero-container'>
        <div className='hero-section'>
          <h1>
            <span className='hero-claim'>
              <span className='hero-claim'>{h1}</span>
            </span>
          </h1>
        </div>
        <div className='hero-section'>
          <div>
            <p className='hero-perex'>{perex}</p>
          </div>
        </div>
        {buttonText === "-" ? (
          <></>
        ) : (
          <div className='hero-section'>
            <button className='cta'>
              {buttonUrl === "-" ? (
                <Link href={"/"}>
                  <span>{buttonText}</span>
                </Link>
              ) : (
                <Link href={`/${buttonUrl}`}>
                  <span>{buttonText}</span>
                </Link>
              )}

              {/*             <Link href={`/${buttonUrl}`}>
              <span>{buttonText}</span>
            </Link> */}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
