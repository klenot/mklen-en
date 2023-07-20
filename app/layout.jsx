import 'styles/globals.css'
import Head from "components/head.jsx"
import Footer from "components/footer.jsx"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <Head />
      
      <body id="main" className="dark-theme">
        <div>
          <header id="nav-bar">
            <nav>
              <div className="nav-container">
                <div className="nav-section logo-section">
                  <a href="index.html">
                    <span id="logo" className="logo">
                      mklenotic
                    </span>
                  </a>
                </div>
                <div className="nav-right-wrapper">
                  <div className="nav-section">
                    <ul className="nav-list">
                      <li className="nav-item">
                        <a id="home" href="index.html">
                          Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a id="about" href="about.html">
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a id="services" href="services.html">
                          Services
                        </a>
                      </li>
                      <li className="nav-item">
                        <a id="blog" href="blog.html">
                          Blog
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div id="burger-icon" className="nav-section mobile-menu-icons">
                    <span
                      style={{ fontSize: 27 }}
                      className="material-symbols-sharp burger-icon"
                      onclick="toggleMenu()"
                    >
                      lunch_dining
                    </span>
                    <span
                      style={{ fontSize: 30 }}
                      id="light-mode"
                      className="material-symbols-sharp"
                      onclick="toggleIcon(), toggleDark()"
                    >
                      light_mode
                    </span>
                  </div>
                </div>
                <div id="mobile-menu" className="mobile-menu-container mobile-menu-hide">
                  <div className="mobile-menu">
                    <ul className="nav-list">
                      <li className="nav-item nav-item-mobile">
                        <a href="index.html">Home</a>
                      </li>
                      <li className="nav-item nav-item-mobile">
                        <a href="about.html">About</a>
                      </li>
                      <li className="nav-item nav-item-mobile">
                        <a href="services.html">Services</a>
                      </li>
                      <li className="nav-item nav-item-mobile">
                        <a href="blog.html">Blog</a>
                      </li>
                      <li className="nav-item nav-item-mobile">
                        <a href="#">
                          <img
                            className="nav-mobile-lang-icon"
                            src="media/icons/czech-flag-icon.png"
                            alt="Czech Repuplic flag standing for the translation into Czech."
                          />
                        </a>
                      </li>
                    </ul>
                    <div>
                      <span
                        style={{ fontSize: 30 }}
                        className="material-symbols-sharp"
                        onclick="closeMenu()"
                      >
                        close
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
        </div>

        {children}
        
        <div>
          <footer id="footer">
              <Footer />
          </footer>
        </div>
        <script src="index.js" defer></script>
      </body>
    </html>
  )
}
