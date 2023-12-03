import Link from "next/link";
import BlogTileRepeater from "./blog-tile-repeater";

export default function BlogTileSection({ h2, perex, buttonText }) {
  return (
    <>
      <section className='blog-tile-section'>
        <div className='blog-section-container'>
          {h2 === "" ? (
            null
          ) : (
            <div className='blog-section pb-2'>
              <h2>{h2}</h2>
            </div>
          )}

          {perex === "" ? (
            null
          ) : (
            <div className='blog-section pb-2'>
              <p>{perex}</p>
            </div>
          )}

          <BlogTileRepeater />

          {buttonText === "" ? (
            null
          ) : (
            <div className='blog-section button-wrapper'>
              <button className='cta ctaLarge'>
                <Link href='/about'>
                  <span className='button-text'>{buttonText}</span>
                </Link>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
