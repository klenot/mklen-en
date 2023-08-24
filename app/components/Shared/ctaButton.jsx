export default function button({ buttonText, buttonLink }) {
  return (
    <>
      <div className='button-wrapper'>
        <button className='cta'>
          <Link href={buttonLink}>
            <span>{buttonText}</span>
          </Link>
        </button>
      </div>
    </>
  );
}
