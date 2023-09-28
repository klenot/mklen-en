export default function HeroBlogPost({ h1, perex, ToC, readingTime, category }) {
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

        <div>{ToC}</div>

        <div className='article-section'>
          <div className='columns'>
            <div className='column'>
              <p className='article-text'>
                <span>⏱ {readingTime}</span>
              </p>
            </div>
            <div className='column'>
              <p className='article-text'>
                <span>📚 {category}</span>
              </p>
            </div>
          </div>
        </div>

        <div className='article-section'>
          <hr></hr>
        </div>
      </div>
    </section>
  );
}
