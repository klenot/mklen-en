import Link from "next/link";

export default function Button({ buttonText, buttonLink, buttonSize }) {
  return (
    <>
      {buttonText === "" ? null : (
        <div className='button-wrapper'>
          <button data-umami-event={buttonText} className={`${"cta"} ${buttonSize === "small" ? "ctaSmall" : "ctaLarge"}`}>
            {buttonLink === "" ? (
              <Link href={"/"}>
                <span className='button-text'>{buttonText}</span>
              </Link>
            ) : (
              <Link href={buttonLink}>
                <span className='button-text'>{buttonText}</span>
              </Link>
            )}
          </button>
        </div>
      )}
    </>
  );
}
