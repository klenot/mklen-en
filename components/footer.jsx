export default function Footer() {
  return(
      <>
        <footer id="footer">
          <svg className="hideSvgSoThatItSupportsFirefox">
            <filter id="sharpBlur">
              <feGaussianBlur stdDeviation="3.5" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"
              />
              <feComposite in2="SourceGraphic" operator="in" />
            </filter>
          </svg>
          
          <div className="footer-container">
            <div className="footer-row-top">
              <div className="footer-section">
                <h2 className="section-title-h2">Get in touch.</h2>
                <p>
                  I built this website with two purposes in mind. To present my
                  knowledge &amp; abilities and to provide services that can help
                  others.
                </p>
                <br />
                <br />
                <p className="contact-info">+420 734 540 226</p>
                <p className="contact-info">mklen@mklenotic.cz</p>
                <p className="contact-info" style={{ paddingBottom: "10%" }}>
                  Download my <span className="hover-underline-animation">contact</span>
                  .
                </p>
              </div>
              <div className="footer-section">
                <h3 className="section-title-h3">
                  You can send me
                  <br />
                  your questions here.
                </h3>
                <form
                  action="https://formsubmit.co/mklen@mklenotic.cz"
                  method="POST"
                  className="form-wrapper"
                >
                  <label htmlFor="name-input">First and last name:</label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    maxLength={40}
                    placeholder="Start with your name here..."
                    required=""
                  />
                  <br />
                  <label htmlFor="email-input">Email:</label>
                  <input
                    id="email-input"
                    type="email"
                    name="email"
                    maxLength={40}
                    placeholder="your@email.com"
                    required=""
                  />
                  <br />
                  <label htmlFor="message-input">Message:</label>
                  <textarea
                    id="message-input"
                    rows={6}
                    name="message"
                    placeholder="Can we meet online?"
                    maxLength={220}
                    required=""
                    defaultValue={""}
                  />
                  <br />
                  <input
                    type="hidden"
                    name="_next"
                    defaultValue="http://127.0.0.1:5501/message-sent.html"
                  />
                  <input
                    type="hidden"
                    name="_autoresponse"
                    defaultValue="Hello :) Thank you for reaching out to me! I am going to respond as soon as I read your message. Have a productive day, MK."
                  />
                  <input
                    type="hidden"
                    name="_subject"
                    defaultValue="New message submitted to mklenotic.com."
                  />
                  <div className="button-wrapper">
                    <button className="cta">
                      <span className="cta-text">
                        send the pidgeon
                        <img
                          className="icon-pidgeon"
                          src="public/icons/pidgeon-1.png"
                          alt="The pidgeon."
                        />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="footer-row-mid">
              <div className="footer-section">
                <nav className="footer-list">
                  <li>
                    <a
                      className="footer-link hover-underline-animation"
                      href="/about.html"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a className="footer-link hover-underline-animation" href="">
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      className="footer-link hover-underline-animation"
                      href="/services.html"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      className="footer-link hover-underline-animation"
                      href="guidelines.html"
                    >
                      Cooperation guidelines
                    </a>
                  </li>
                  <li>
                    <a
                      className="footer-link hover-underline-animation"
                      href="/blog.html"
                    >
                      Blog
                    </a>
                  </li>
                </nav>
              </div>
              <div className="footer-section">
                <nav className="footer-list">
                  <li>
                    <a
                      className="footer-link hover-underline-animation"
                      href="https://www.facebook.com/klenoticmarek"
                      target="”_blank”"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      className="footer-link hover-underline-animation"
                      href="https://www.linkedin.com/in/klenoticmarek/"
                      target="”_blank”"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      className="footer-link hover-underline-animation"
                      href="https://www.instagram.com/mklenotic/?hl=cs"
                      target="”_blank”"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      className="footer-link hover-underline-animation"
                      href="https://github.com/klenot"
                      target="”_blank”"
                    >
                      Github
                    </a>
                  </li>
                </nav>
              </div>
            </div>
            <div className="footer-row-bottom">
              <div className="footer-bottom">
                <div className="footer-bottom-container">
                  <p>
                    2023 © Created in Prague on Macbook Pro M1.{" "}
                    <span>
                      <img
                        className="footer-icon"
                        src="public/icons/disclaimer-macbook.png"
                        alt="Macbook Pro as a disclaimer icon."
                      />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
  );
}