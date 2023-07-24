export default function TileRepeater() {
    return (
      <>
        <section id="more">
            <div className="tile-section-container">
                <div className="tile-section section-title-h2">
                    <h2>Project management</h2>
                </div>
                
                <div className="tile-section">
                    <p>
                        In my project management blog posts you can explore various strategies
                        and techniques for planning, executing, and delivering projects on time
                        and within budget. From agile methodologies to project planning tools,
                        I've got you covered.
                    </p>
                </div>

                <div className="tile-section">
                    <div className="tile-container">
                        <div className="tile-item">
                            <img
                                src="media/thumbnails/pawel-czerwinski-NTYYL9Eb9y8-unsplash.jpg"
                                alt=""
                                className="tile-thumbnail"
                            />
                            <div className="tile-info-wrapper">
                                <h3 className="tile-title">Project Phases:</h3>
                                <p className="tile-perex">How Not to Get Stuck in Your Project</p>
                            </div>
                        </div>
                        <div className="tile-item">
                            <img
                                src="media/thumbnails/pawel-czerwinski-NTYYL9Eb9y8-unsplash.jpg"
                                alt=""
                                className="tile-thumbnail"
                            />
                            <div className="tile-info-wrapper">
                                <h3 className="tile-title">Create a Bulletproof WBS:</h3>
                                <p className="tile-perex">How Not to Get Stuck in Your Project</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </>
    )
  }
