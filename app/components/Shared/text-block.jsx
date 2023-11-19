export default function TextBlock({ heading, text }) {
  return (
    <>
      <section className='pt-5 pb-5'>
        <div className='text-section-container'>
          <div className='text-section'>
            {heading === "-" ? null : <h2 className='pb-2'>{heading}</h2>}
            {text === "-" ? null : <p>{text}</p>}
          </div>
        </div>
      </section>
    </>
  );
}
