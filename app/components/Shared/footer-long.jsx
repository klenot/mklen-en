import Link from "next/link";

export default function Footer({ props }) {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer id='footer'>
        <div className='footer-container'>
          <div className='footer-divider-wrapper pb-10'>
            <hr className='footer-divider'></hr>
          </div>
          <div className='footer-row-top'>
            <div className='footer-section'>
              {props === undefined ? (
                <>
                  <h2 className='footer-get-in-touch'>The purpose</h2>
                  <p>
                    I lacked my own playground
                    <br />
                    so I created one.
                  </p>
                </>
              ) : (
                <>
                  <h2 className='footer-get-in-touch'>{props.title}</h2>
                  <p>
                    {props.message1}
                    <br />
                    {props.message2}
                  </p>
                </>
              )}
              <br />
              <br />
              <p className='contact-info'>+420 734 *** ***</p>
              <p className='contact-info'>mklen(at)mklenotic.cz</p>
              <p className='contact-info' style={{ paddingBottom: "10%" }}>
                Download my{" "}
                <a href="https://drive.google.com/uc?export=download&id=1AJJsjFDY0JaM4qlk2lURp8mm4DUKnkom"><span className='hover-underline-animation'>contact</span></a>.
              </p>
            </div>
            <div className='footer-section'>
              <h3 className='section-title-h3'>Get in touch</h3>
              <form
                action='https://formsubmit.co/6421f614d7be08be4dcc51fa8f3c0e69'
                method='POST'
                className='form-wrapper'>
                <label htmlFor='name-input'>First and last name:</label>
                <input
                  id='name-input'
                  type='text'
                  name='name'
                  maxLength={40}
                  placeholder='How you want to be called?'
                  required=''
                />
                <br />
                <label htmlFor='email-input'>Email:</label>
                <input
                  id='email-input'
                  type='email'
                  name='email'
                  maxLength={40}
                  placeholder='your.awesome@email.com'
                  required=''
                />
                <br />
                <label htmlFor='message-input'>Message:</label>
                <textarea
                  id='message-input'
                  rows={6}
                  name='message'
                  placeholder='Can we meet online?'
                  maxLength={220}
                  required=''
                  defaultValue={""}
                />
                <br />
                <input
                  type='hidden'
                  name='_next'
                  defaultValue='https://www.mklenotic.com/message-sent'
                />
                <input
                  type='hidden'
                  name='_autoresponse'
                  defaultValue='Hello, thank you for reaching out to me 👋🏻 I am going to respond as soon as I read your message. Marek'
                />
                <input
                  type='hidden'
                  name='_subject'
                  defaultValue='New message submitted to mklenotic.com.'
                />
                <div className='button-wrapper'>
                  <button className='cta ctaLarge'>
                    <span className='button-text' style={{ paddingTop: "2px" }}>
                      Send
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='footer-row-mid'>
            <div className='footer-section'>
              <nav className='footer-list'>
                <li>
                  <Link
                    className='footer-link hover-underline-animation'
                    href='/about'>
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className='footer-link hover-underline-animation'
                    href='/projects'>
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    className='footer-link hover-underline-animation'
                    href='/services'>
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    className='footer-link hover-underline-animation'
                    href='/cooperation'>
                    Cooperation
                  </Link>
                </li>
                <li>
                  <Link
                    className='footer-link hover-underline-animation'
                    href='/blog'>
                    Blog
                  </Link>
                </li>
              </nav>
            </div>
            <div className='footer-section'>
              <nav className='footer-list'>
                <li>
                  <Link
                    className='footer-link hover-underline-animation'
                    href='https://www.facebook.com/klenoticmarek'
                    target='”_blank”'>
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    className='footer-link hover-underline-animation'
                    href='https://www.linkedin.com/in/klenoticmarek/'
                    target='”_blank”'>
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    className='footer-link hover-underline-animation'
                    href='https://www.instagram.com/mklenotic/?hl=cs'
                    target='”_blank”'>
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    className='footer-link hover-underline-animation'
                    href='https://github.com/klenot'
                    target='”_blank”'>
                    Github
                  </Link>
                </li>
              </nav>
            </div>
          </div>
          <div className='footer-row-bottom'>
            <div className='footer-bottom'>
              <div className='footer-bottom-container'>
                <p>
                  {currentYear} © Handcrafted in Prague with Next.js & Notion
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
