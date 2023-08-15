import BlogRepeater from "./blogRepeater";

export default function BlogSection({h2, perex}) {
  return (
    <>
      <section id='blog-section'>
        <div className='blog-section-container'>
          <div className='blog-section section-title-h2'>
            <h2 className='mt-2'>{h2}</h2>
          </div>
          <div className='blog-section'>
            <p>{perex}</p>
          </div>

        <BlogRepeater />

          <div className='blog-section button-wrapper'>
            <button className='cta'>
              <span>more writings</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
