export default function ServiceRepeater() {
    return (
      <>
        <section id="service-section-2">
            <div className="service-container">
                <div className="service-section section-title-h2">
                    <h2>How I&nbsp;can help your business</h2>
                </div>
                <div className="service-section">
                    <p>
                        As an experienced martech specialist, project manager and digital
                        marketing consultant I&nbsp;can help you achieve your business goals.
                    </p>
                    <br />
                </div>
            </div>

            <div className="service-container">
                <div className="cards-container">
                    <div className="cards">
                        <div className="card">
                            <h3>Title</h3>
                            <p>Description</p>
                        </div>
                        <div className="card">
                            <h3>Title</h3>
                            <p>Description</p></div>
                        <div className="card">
                            <h3>Title</h3>
                            <p>Description</p>
                        </div>
                        <div className="card">
                            <h3>Title</h3>
                            <p>Description</p>
                        </div>
                    </div>        
                </div>
            </div>
        
            <div className="service-container">
                <div className="hero-section hero-button-wrapper">
                <a href="/services.html">
                    <button onclick="scrollToFooter()" className="cta">
                    <span>explore all services</span>
                    </button>
                </a>
                </div>
            </div>
        </section>
      </>
    )
  }
