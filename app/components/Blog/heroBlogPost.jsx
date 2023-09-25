export default function HeroBlogPost({ h1, perex, tableOfContent }) {
  return (
    <section id='hero-section'>
      <div className='hero-container blog-hero-container'>
        <div>
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
        </div>

        <div>
          {tableOfContent}
        </div>
      </div>
    </section>
  );
}
