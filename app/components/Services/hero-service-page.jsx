import Button from "app/components/Shared/cta-button";
import Image from "next/image";

export default function HeroServicePage({
  title,
  perex,
  image,
  buttonText,
  buttonLink,
}) {
  return (
    <section>
      <div className='service-hero-container'>
        <div>
          <h1>
            <span className='service-hero-claim'>{title}</span>
          </h1>
        </div>
        <div>
          <div>
            <p className='hero-perex'>{perex}</p>
          </div>
        </div>
        {buttonText === "" ? null : (
          <div className='service-hero-button-wrapper'>
            <Button
              buttonText={buttonText}
              buttonLink={buttonLink}
              buttonSize={"small"}
            />
          </div>
        )}
      </div>
      <div className='service-hero-image'>
        <Image
          src={image.src}
          alt={image.alt}
          layout='fill'
          objectFit='cover'
        />
      </div>
    </section>
  );
}
