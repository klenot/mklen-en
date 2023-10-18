import Image from "next/image"
import Link from "next/link";

export default function Footer() {

  const currentYear = new Date().getFullYear();

  return(
      <>
        <footer id="footer">
          <div className="footer-container">
            <div className="footer-divider-wrapper pb-10">
            <hr className="footer-divider"></hr>
            </div>
            <div className="footer-row-top">
              <div className="footer-section">
                <h2 className="footer-get-in-touch">The purpose</h2>
                <p>
                I lacked my own playground <br />so I created one.
                </p>
                <br />
                <br />
                <p className="contact-info">+420 734 540 226</p>
                <p className="contact-info">mklen@mklenotic.cz</p>
                <p className="contact-info" style={{ paddingBottom: "10%" }}>
                  Download my <span className="hover-underline-animation">contact</span>.
                </p>
              </div>
              <div className="footer-section">
                <h3 className="section-title-h3">
                  Get in touch
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
                    placeholder="How you want to be called?"
                    required=""
                  />
                  <br />
                  <label htmlFor="email-input">Email:</label>
                  <input
                    id="email-input"
                    type="email"
                    name="email"
                    maxLength={40}
                    placeholder="your.awesome@email.com"
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
                    defaultValue="http://localhost:3000/message-sent"
                  />
                  <input
                    type="hidden"
                    name="_autoresponse"
                    defaultValue="Hello, thank you for reaching out to me :) I am going to respond as soon as I read your message. Have a productive day, MK."
                  />
                  <input
                    type="hidden"
                    name="_subject"
                    defaultValue="New message submitted to mklenotic.com."
                  />
                  <div className="button-wrapper">
                    <button className="cta">
                      <span className="button-text" style={{paddingTop: "2px"}}>
                        Send night owl
                        <span style={{paddingLeft:"8px"}}>
                        <Image
                          src={"/icons/pidgeon-1.png"}
                          alt={"The pidgeon."}
                          width={20}
                          height={20}
                          style={{
                            position: "relative",
                            top: "2px"
                          }}
                        />
                        </span>
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
                    <Link
                      className="footer-link hover-underline-animation"
                      href="/about"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link className="footer-link hover-underline-animation" href="/projects">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="footer-link hover-underline-animation"
                      href="/services"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="footer-link hover-underline-animation"
                      href="/cooperation"
                    >
                      Cooperation
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="footer-link hover-underline-animation"
                      href="/blog"
                    >
                      Blog
                    </Link>
                  </li>
                </nav>
              </div>
              <div className="footer-section">
                <nav className="footer-list">
                  <li>
                    <Link
                      className="footer-link hover-underline-animation"
                      href="https://www.facebook.com/klenoticmarek"
                      target="”_blank”"
                    >
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="footer-link hover-underline-animation"
                      href="https://www.linkedin.com/in/klenoticmarek/"
                      target="”_blank”"
                    >
                      LinkedIn
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="footer-link hover-underline-animation"
                      href="https://www.instagram.com/mklenotic/?hl=cs"
                      target="”_blank”"
                    >
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="footer-link hover-underline-animation"
                      href="https://github.com/klenot"
                      target="”_blank”"
                    >
                      Github
                    </Link>
                  </li>
                </nav>
              </div>
            </div>
            <div className="footer-row-bottom">
              <div className="footer-bottom">
                <div className="footer-bottom-container">
                  <p>
                    {currentYear} © Created in Prague with Next.js & Notion {" "}
                    <span>
                      <Image
                        src={"/icons/disclaimer-macbook.png"}
                        alt={"Macbook Pro as a disclaimer icon."}
                        width={19}
                        height={19}
                        style={{
                          position: "relative",
                          top: "4px"
                        }}
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