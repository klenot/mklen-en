import Link from "next/link";
import ServiceRepeater from "./serviceRepeater";

export default function ServiceSection({
  title,
  description,
  button,
  filters,
}) {
  return (
    <>
      <section className="pb-5">
        <div className='service-container'>
          {title === "-" ? (
            <></>
          ) : (
            <div className='service-section pt-10 pb-1'>
              <h2>{title}</h2>
            </div>
          )}
          {description === "-" ? (
            <></>
          ) : (
            <div className='service-section'>
              <p>{description}</p>
              <br />
            </div>
          )}
        </div>
        <div className='service-container'>
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
          <div className='service-container'>
            <div className='service-section button-wrapper'>
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