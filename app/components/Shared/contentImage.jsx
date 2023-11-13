import Image from "next/image";
import Button from "app/components/Shared/ctaButton"

export default function ContentImage({ anchor, direction, padding, heading, text, button, image }) {
  return (
    <>
        <section id={anchor === "" ? null : anchor} className={padding === "none" ? null : "pt-5 pb-5"}>
          <div className={`${"contentImageContainer"} ${direction === "right" ? "contentImageTextRight" : "contentImageTextLeft"}`}>
          <div className='contentImageTextWrapper'>
            {heading === "-" ? null : <h2 className="pb-2">{heading}</h2>}
            {text === "-" ? null : <p>{text}</p>}
            <div className = "pt-3">
            <Button
              buttonText={button.text}
              buttonLink={button.link}
              buttonSize={button.size}
            />
            </div>
            </div>
            <div className='contentImageMediaWrapper'>
              <Image
                className='contentImagePicture'
                src={image.url}
                alt={image.alt}
                layout={"responsive"}
                width={400}
                height={400}
              />
            </div>
          </div>
        </section>
    </>
  );
}
