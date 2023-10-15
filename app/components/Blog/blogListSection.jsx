import Link from "next/link";
import BlogListRepeater from "./blogListRepeater";

export default function BlogListSection({ title, perex, button, filters }) {
  return (
    <>
      <section id='blog-section' className='pt-10 pb-10'>
        <div className='blog-section-container'>
          <div className='blog-section pb-2'>
            <h2>{title}</h2>
          </div>
          <div className='blog-section pb-2'>
            <p>{perex}</p>
          </div>

          <BlogListRepeater
            filterA={filters.filterA}
            categoryA={filters.categoryA}
            filterB={filters.filterB}
            categoryB={filters.categoryB}
          />

          {button.text === "-" ? (
            <></>
          ) : (
            <div className="pt-2">
              <div className='blog-section button-wrapper'>
                <button className='cta'>
                  {button.link === "" ? (
                    <Link href='/'>
                      <span className="button-text">{button.text}</span>
                    </Link>
                  ) : (
                    <Link href={button.link}>
                      <span className="button-text">{button.text}</span>
                    </Link>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
