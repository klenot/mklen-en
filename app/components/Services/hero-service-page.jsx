import Link from "next/link";

export default function HeroServicePage({ h1, perex, buttonText }) {

  return (
    <section>
      <div className='service-hero-container'>
        <div className='hero-section'>
          <h1>
            <span className='hero-claim'>
              <span className='service-hero-claim'>{h1}</span>
            </span>
          </h1>
        </div>
        <div className='hero-section'>
          <div>
            <p className='hero-perex'>{perex}</p>
          </div>
        </div>
        {buttonText === "-" ? <></> : <div className='hero-section'>
          <button className='cta'>
            <Link href='/about'>
              <span className="button-text">{buttonText}</span>
            </Link>
          </button>
        </div>}
      </div>
    </section>
  );
}
