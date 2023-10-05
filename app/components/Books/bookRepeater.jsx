import Slider from "app/components/Shared/slider";

export default function BookRepeater({ heading, description }) {
  return (
    <>
      <section className='pt-10 pb-10'>
        <div className='service-container'>
          <div className='text-section pb-2'>
            <h2>{heading}</h2>
          </div>
          <div className='text-section pb-1'>
            <p>{description}</p>
          </div>
        </div>
        <div className='service-container'>
          <Slider />
        </div>
      </section>
    </>
  );
}
