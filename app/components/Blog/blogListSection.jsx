import Link from "next/link";
import BlogListRepeater from "./blogListRepeater";

export default function BlogListSection({ h2, perex, buttonText }) {
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

          <BlogListRepeater />

          <div className='blog-section button-wrapper'>
            <Link href="/blog">
              <button className='cta'>
                <span>{buttonText}</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
