import Link from "next/link";

export default function Button({ buttonText, buttonLink }) {
  return (
    <>
      {buttonText === "" ? null : (
        <div className='button-wrapper'>
          <button className='cta'>
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
