"use client"

import Link from "next/link";

export default function Button({ buttonText, buttonLink, buttonSize }) {
  return (
    <>
      {buttonText === "" ? null : (
        <div className='button-wrapper'>
          <button onClick={() => umami.track({buttonText})} className={`${"cta"} ${buttonSize === "small" ? "ctaSmall" : "ctaLarge"}`}>
            {buttonLink === "" ? (
              <Link data-umami-event={buttonText} href={"/"}>
                <span className='button-text'>{buttonText}</span>
              </Link>
            ) : (
              <Link data-umami-event={buttonText} href={buttonLink}>
                <span className='button-text'>{buttonText}</span>
              </Link>
            )}
          </button>
        </div>
      )}
    </>
  );
}
