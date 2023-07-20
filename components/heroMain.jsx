export default function HeroMain() {
    return (
        <section id="hero-section">
        <div className="hero-container">
          <div className="hero-section">
            <h1>
              <span className="hero-claim">
                <span className="hero-claim-animated-text" />
                <br />
                <span className="hero-claim">My name is Marek.</span>
              </span>
            </h1>
          </div>
          <div className="hero-section">
            <div>
              <p className="hero-perex">
                I'm&nbsp;a&nbsp;martech specialist&nbsp;&amp;&nbsp;project manager
                with a passion for effective digital strategies.
              </p>
            </div>
          </div>
          <div className="hero-section hero-button-wrapper">
            <a href="about.html">
              <button className="cta">
                <span>get to know me</span>
              </button>
            </a>
          </div>
        </div>
      </section>
      
    )
  }