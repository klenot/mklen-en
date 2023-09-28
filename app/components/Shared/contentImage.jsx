import Image from "next/image";

export default function ContentImage({ direction, heading, text, image }) {
  return (
    <>
      {direction === "right" ? (
        <section id='content-image-right' className="pt-5 pb-5">
          <div className='content-image-container'>
          <div className='content-image-section cnt-img-text-wrapper'>
            {heading === "-" ? null : <h2 className="pb-2">{heading}</h2>}
            {text === "-" ? null : <p>{text}</p>}
            </div>
            <div className='content-image-section cnt-img-media-wrapper'>
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
        <section id='content-image-left' className="pt-5 pb-5">
          <div className='content-image-container cnt-img-right'>
          <div className='content-image-section cnt-img-text-wrapper'>
            {heading === "-" ? null : <h2 className="pb-2">{heading}</h2>}
            {text === "-" ? null : <p>{text}</p>}
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
