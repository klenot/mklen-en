import BlogTileRepeater from "./blogTileRepeater";

export default function BlogTileSection({ h2, perex, buttonText }) {
  return (
    <>
      <section id='blog-section'>
        <div className='blog-section-container'>
          <div className='blog-section section-title-h2'>
            <h2 className='mt-2'>
              
              {h2}
              
            </h2>
          </div>
          <div className='blog-section'>
            <p>
              
              {perex}

            </p>
          </div>

          <BlogTileRepeater />

          <div className='blog-section button-wrapper'>
            <button className='cta'>
              <span>
                
                {buttonText}
              
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
