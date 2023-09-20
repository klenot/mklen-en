import Link from "next/link";
import BlogListRepeater from "./blogListRepeater";

export default function BlogListSection({ h2, perex, buttonText }) {
  return (
    <>
      <section id='blog-section' className="pt-10 pb-10">
        <div className='blog-section-container'>
          <div className='blog-section pb-2'>
            <h2>{h2}</h2>
          </div>
          <div className='blog-section pb-2'>
            <p>{perex}</p>
          </div>

          
          <BlogListRepeater />
          
        <div className="pt-2 pb-2">
          <div className='blog-section button-wrapper'>
            <Link href="/blog">
              <button className='cta'>
                <span>{buttonText}</span>
              </button>
            </Link>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
