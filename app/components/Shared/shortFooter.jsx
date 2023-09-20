import Image from "next/image"
import Link from "next/link";

export default function ShortFooter() {

  const currentYear = new Date().getFullYear();

  return(
      <>
        <footer id="footer" className="pt-5">
          <div className="footer-container">
            <div className="footer-row-mid pt-2">
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
                    <Link className="footer-link hover-underline-animation" href="/">
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
                      href="/"
                    >
                      Cooperation guidelines
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
                <nav className="footer-list-right">
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