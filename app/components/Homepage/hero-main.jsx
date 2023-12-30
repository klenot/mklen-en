import Link from "next/link";

export default function HeroMain({ title, sideKick, button }) {
  return (
    <section id='hero-section'>
      <div className='hero-container'>
        <div className='hero-section'>
          <h1>
            <span className='hero-claim'>
              <span className='hero-claim-animated-text' />
              <br />
              <span className='hero-claim'>{title}</span>
            </span>
          </h1>
        </div>
        <div className='hero-section'>
          <div>
            <p className='hero-perex'>{sideKick}</p>
          </div>
        </div>
        <div className='hero-section'>
          <button data-umami-event={button.text} className='cta ctaLarge'>
            <Link href={button.link}>
              <span className="button-text">{button.text}</span>
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
