import Link from "next/link";
import BlogListRepeater from "./blog-list-repeater";

export default function BlogListSection({ title, perex, button, filters }) {
  return (
    <>
      <section className='blog-list-section'>
        <div className='blog-section-container'>
          {title === "" ? null : <div className='blog-section'>
            <h2>{title}</h2>
          </div>}
         {perex === "" ? null : <div className='blog-section'>
            <p>{perex}</p>
          </div>}

          <BlogListRepeater
            filterA={filters.filterA}
            categoryA={filters.categoryA}
            filterB={filters.filterB}
            categoryB={filters.categoryB}
          />

          {button.text === "" ? (
            null
          ) : (
            <div>
              <div className='blog-section button-wrapper'>
                <button className='cta ctaLarge'>
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
