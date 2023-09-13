import Link from "next/link";
import BlogTileRepeater from "./blogTileRepeater";

export default function BlogTileSection({ h2, perex, buttonText }) {
  return (
    <>
      <section id='blog-section'>
        <div className='blog-section-container'>
          {h2 === "-" ? (
            <></>
          ) : (
            <div className='blog-section section-title-h2'>
              <h2 className='mt-2'>{h2}</h2>
            </div>
          )}

          {perex === "-" ? (
            <></>
          ) : (
            <div className='blog-section'>
              <p>{perex}</p>
            </div>
          )}

          <BlogTileRepeater />
          {buttonText === "-" ? (
            <></>
          ) : (
            <div className='blog-section button-wrapper'>
              <button className='cta'>
                <Link href='/about'>
                  <span>{buttonText}</span>
                </Link>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
