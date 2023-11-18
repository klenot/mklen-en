import Link from "next/link";
import ServiceRepeater from "app/components/Services/service-repeater.jsx";

export default function ServiceSection({
  title,
  description,
  button,
  filters,
}) {
  return (
    <>
      <section className="pb-5">
        <div className='landing-page-container'>
          {title === "-" ? (
            <></>
          ) : (
            <div className='landing-page-section pt-10 pb-1'>
              <h2>{title}</h2>
            </div>
          )}
          {description === "-" ? (
            <></>
          ) : (
            <div className='landing-page-section'>
              <p>{description}</p>
              <br />
            </div>
          )}
        </div>
        <div className='landing-page-container'>
          <ServiceRepeater
            filterA={filters.filterA}
            categoryA={filters.categoryA}
            filterB={filters.filterB}
            categoryB={filters.categoryB}
          />
        </div>

        {button.text === "-" ? (
          <></>
        ) : (
          <div className='landing-page-container'>
            <div className='landing-page-section button-wrapper'>
              <button className='cta ctaLarge'>
                {button.link === "" ? 
                <Link href="/">
                <span className="button-text">{button.text}</span>
              </Link>
              :
              <Link href={button.link}>
                  <span className="button-text">{button.text}</span>
              </Link>
              }
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
