import Slider from "app/components/Shared/slider";

export default function BookRepeater({ heading, description }) {
  return (
    <>
      <section className='book-outter-container'>
        <div className='landing-page-container'>
          <div className='books-repeater-text pb-2'>
            <h2>{heading}</h2>
          </div>
          <div className='books-repeater-text pb-2'>
            <p>{description}</p>
          </div>
        </div>
        <div className='landing-page-container'>
          <Slider />
        </div>
      </section>
    </>
  );
}
