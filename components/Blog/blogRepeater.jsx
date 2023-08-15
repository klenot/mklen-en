import BlogFilter from "components/Blog/blogFilter.jsx"

export default function BlogRepeater() {
    return (
      <>
        <section id="blog-section">
            <div className="blog-section-container">
                <div className="blog-section section-title-h2">
                <h2 className="mt-2">Writing</h2>
                </div>
                <div className="blog-section">
                <p>
                    When I'm getting into a new subject or reflecting on my experiences,
                    writing helps me to clarify my thoughts and better understand the topic.
                    Writing is the essential part of my learning process.
                </p>
                </div>

                <div className="blog-section">
                
                <BlogFilter />

                <div className="blog-list-container">
                    <div className="blog-list-item display-item pm">
                    <a href="index.html">
                        <div className="post-category-pm">
                        <div className="pill">
                            <span>Project management</span>
                        </div>
                        </div>
                        <div className="post-title">
                        <h3>Project Phases: How Not to Get Stuck in Your Project</h3>
                        </div>
                        <div className="post-perex">
                        <p>
                            Learn about the project phases, a fundamental part of project
                            management planning.
                        </p>
                        </div>
                        <div className="post-date">
                        <p>September 21, 2022</p>
                        </div>
                    </a>
                    </div>
                    <div className="blog-list-item display-item prod">
                    <a href="index.html">
                        <div className="post-category-prod">
                        <div className="pill">
                            <span>Productivity</span>
                        </div>
                        </div>
                        <div className="post-title">
                        <h3>
                            The Eisenhower Decision Matrix: A Simple Way to Prioritise Your
                            Tasks
                        </h3>
                        </div>
                        <div className="post-perex">
                        <p>
                            Avoid the urgency trap. Prioritise your tasks using the
                            Eisenhower decision matrix.
                        </p>
                        </div>
                        <div className="post-date">
                        <p>October 8, 2022</p>
                        </div>
                    </a>
                    </div>
                    <div className="blog-list-item display-item pm">
                    <a href="index.html">
                        <div className="post-category-pm">
                        <div className="pill">
                            <span>Project management</span>
                        </div>
                        </div>
                        <div className="post-title">
                        <h3>
                            Create a Bulletproof WBS: How Not to Get Stuck in Your Project
                        </h3>
                        </div>
                        <div className="post-perex">
                        <p>
                            Learn about Work Breakdown Structure (WBS). A key part of your
                            project success.
                        </p>
                        </div>
                        <div className="post-date">
                        <p>November 6, 2022</p>
                        </div>
                    </a>
                    </div>
                </div>
                </div>
                <div className="blog-section button-wrapper">
                <button className="cta">
                    <span>more writings</span>
                </button>
                </div>
            </div>
        </section>
      </>
    );
  }