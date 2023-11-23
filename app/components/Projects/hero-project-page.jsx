import Link from "next/link";

export default function HeroProjectPage({ title, sideKick, button }) {

  return (
    <section>
      <div className='project-hero-container'>
        <div className='hero-section'>
          <h1>
            <span className='hero-claim'>
              <span className='hero-claim'>{title}</span>
            </span>
          </h1>
        </div>
        <div className='hero-section'>
          <div>
            <p className='hero-perex'>{sideKick}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
