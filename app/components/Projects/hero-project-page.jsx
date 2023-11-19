import Link from "next/link";

export default function HeroProjectPage({ h1, perex, buttonText, heroLink }) {

  return (
    <section>
      <div className='service-hero-container'>
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
        {buttonText === "-" ? <></> : <div className='hero-section'>
          <button className='cta'>
            <Link href={heroLink}>
              <span>{buttonText}</span>
            </Link>
          </button>
        </div>}
      </div>
    </section>
  );
}
