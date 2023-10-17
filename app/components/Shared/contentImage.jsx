import Image from "next/image";
import Button from "app/components/Shared/ctaButton"

export default function ContentImage({ anchor, direction, heading, text, button, image }) {
  return (
    <>
      {direction === "right" ? (
        <section id={anchor === "" ? null : anchor} className="pt-5 pb-5">
          <div className='content-image-container'>
          <div className='content-image-section cnt-img-text-wrapper'>
            {heading === "-" ? null : <h2 className="pb-2">{heading}</h2>}
            {text === "-" ? null : <p>{text}</p>}
            <div className = "pt-2">
            <Button
              buttonText={button.text}
              buttonLink={button.link}
            />
            </div>
            </div>
            <div className='content-image-section cnt-img-media-wrapper-left'>
              <Image
                className='content-image-media'
                src={image.url}
                alt={image.alt}
                width={300}
                height={300}
              />
            </div>
            
          </div>
        </section>
      ) : (
        <section id={anchor === "" ? null : anchor} className="pt-5 pb-5">
          <div className='content-image-container cnt-img-right'>
          <div className='content-image-section cnt-img-text-wrapper'>
            {heading === "-" ? null : <h2 className="pb-2">{heading}</h2>}
            {text === "-" ? null : <p>{text}</p>}
            <div className = "pt-2">
            <Button
              buttonText={button.text}
              buttonLink={button.link}
            />
            </div>
            </div>
            <div className='content-image-section cnt-img-media-wrapper-right'>
              <Image
                className='content-image-media'
                src={image.url}
                alt={image.alt}
                width={300}
                height={300}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
