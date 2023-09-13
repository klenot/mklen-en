import Link from "next/link";
import ServiceRepeater from "./serviceRepeater";

export default function ServiceSection({ title, description, buttonText }) {
  return (
    <>
      <section id='service-section'>
        <div className='service-container'>
          {title === "-" ? (
            <></>
          ) : (
            <div className='service-section section-title-h2'>
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

        <ServiceRepeater />

        {buttonText === "-" ? (
          <></>
        ) : (
          <div className='service-container'>
            <div className='hero-section hero-button-wrapper'>
              <button className='cta'>
                <Link href='/services.html'>
                  <span>{buttonText}</span>
                </Link>
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
