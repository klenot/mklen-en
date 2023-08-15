import Link from "next/link";

export default function HeroMain({ h1, perex, buttonText }) {
  return (
    <section id='hero-section'>
      <div className='hero-container'>
        <div className='hero-section'>
          <h1>
            <span className='hero-claim'>
              <span className='hero-claim-animated-text' />
              <br />
              <span className='hero-claim'>{h1}</span>
            </span>
          </h1>
        </div>
        <div className='hero-section'>
          <div>
            <p className='hero-perex'>{perex}</p>
          </div>
        </div>
        <div className='hero-section hero-button-wrapper'>
          <button className='cta'>
            <Link href='about.html'>
              <span>{buttonText}</span>
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
