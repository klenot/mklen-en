export default function Form({ heading, description }) {
    return (
      <>
        <div className="pt-5 pb-5">
            <div className="text-section-container">
              {heading === "" ? null :
              <h2 className='form-h2'>{heading}</h2>}
              {description === "" ? null :
              <p className='text-section'>{description}</p>}
                <form
                  action='https://formsubmit.co/mklen@mklenotic.cz'
                  method='POST'
                  className='form-wrapper'>
                  <label className='form-label' htmlFor='name-input'>
                    First and last name:
                  </label>
                  <input
                    className='form-input'
                    id='name-input'
                    type='text'
                    name='name'
                    maxLength={40}
                    placeholder='How you want to be called?'
                    required=''
                  />
                  <br />
                  <label className='form-label' htmlFor='email-input'>
                    Email:
                  </label>
                  <input
                    className='form-input'
                    id='email-input'
                    type='email'
                    name='email'
                    maxLength={40}
                    placeholder='Can we meet online?'
                    required=''
                  />
                  <br />
                  <label className='form-label' htmlFor='message-input'>
                    Message:
                  </label>
                  <textarea
                    className='form-input'
                    id='message-input'
                    rows={5}
                    name='message'
                    placeholder='Can we meet online?'
                    maxLength={220}
                    required=''
                    defaultValue={""}
                  />
                  <br />
                  <input type='hidden' name='_next' defaultValue='https://www.mklenotic.com/message-sent' />
                  <input
                    type='hidden'
                    name='_autoresponse'
                    defaultValue='Hello :) Thank you for reaching out to me! I am going to respond as soon as I read your message. Have a productive day, MK.'
                  />
                  <input
                    type='hidden'
                    name='_subject'
                    defaultValue='New message submitted from mklenotic.com.'
                  />
                  <div className='button-wrapper'>
                    <button data-umami-event={"{"+"Form submit"+"}"} className='cta ctaLarge'>
                      <span className="button-text">Submit</span>
                    </button>
                  </div>
                </form>
              </div>
          </div>
      </>
    )
  }