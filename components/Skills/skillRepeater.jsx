import SkillFilter from "/components/Skills/skillFilter.jsx"
import Image from "next/image"

export default function SkillRepeater() {
  return (
    <>
      <section id='skill-section'>
        <div className='skill-section-container'>
          <div className='skill-section section-title-h2'>
            <h2>I am trying to suck a bit less every day.</h2>
          </div>
          <div className='skill-section'>
            <p>
              I'm developing my skills on a daily basis. Continuous growth is a
              lifelong journey &amp; culture.
            </p>
          </div>
          <div className='skill-section'>
            
            <SkillFilter />

            <div className='skill-list-container'>
              <div className='skill-list-item shw man'>
                <div className='skill-title'>
                  <h3>Project management</h3>
                </div>
                <div className='skill-list-item-wrapper'>
                  <div className='skill-perex'>
                    <p>I can effectively lead multiple projects at once.</p>
                  </div>
                  <div className='skill-tag-wrapper'>
                    <div className='skill-category'>
                      <div className=''>
                        <span>Administration</span>
                      </div>
                    </div>
                    <div className='skill-level'>
                      <div className=''>
                        <span>Advanced</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='skill-list-item shw ana'>
                <div className='skill-title'>
                  <h3>Google Tag Manager</h3>
                </div>
                <div className='skill-list-item-wrapper'>
                  <div className='skill-perex'>
                    <p>
                      I'm able to set up standard as well as advanced GTM
                      triggers.
                    </p>
                  </div>
                  <div className='skill-tag-wrapper'>
                    <div className='skill-category'>
                      <div className=''>
                        <span>Analytics</span>
                      </div>
                    </div>
                    <div className='skill-level'>
                      <div className=''>
                        <span>Advanced</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='skill-list-item shw ana'>
                <div className='skill-title'>
                  <h3>GA4</h3>
                </div>
                <div className='skill-list-item-wrapper'>
                  <div className='skill-perex'>
                    <p>I can set up GA4 and its native reports.</p>
                  </div>
                  <div className='skill-tag-wrapper'>
                    <div className='skill-category'>
                      <div className=''>
                        <span>Analytics</span>
                      </div>
                    </div>
                    <div className='skill-level'>
                      <div className=''>
                        <span>Advanced</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='skill-list-item shw dig'>
                <div className='skill-title'>
                  <h3>Solution making</h3>
                </div>
                <div className='skill-list-item-wrapper'>
                  <div className='skill-perex'>
                    <p>
                      I can derive ideas through creative techniques such as
                      double diamond process or thinking gap.
                    </p>
                  </div>
                  <div className='skill-tag-wrapper'>
                    <div className='skill-category'>
                      <div className=''>
                        <span>Creative</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='skill-list-item shw cod'>
                <div className='skill-title'>
                  <h3>
                    HTML5{" "}
                    <Image
                      src={'/icons/html5.png'}
                      alt={'The HTML5 logo.'}
                      width={16.5}
                      height={16.5}
                      style={{
                        position: "relative",
                        top: "4px"
                      }}
                    />
                  </h3>
                </div>
                <div className='skill-list-item-wrapper'>
                  <div className='skill-perex'>
                    <p>I can code in HTML5.</p>
                  </div>
                  <div className='skill-tag-wrapper'>
                    <div className='skill-category'>
                      <div className=''>
                        <span>Coding</span>
                      </div>
                    </div>
                    <div className='skill-level'>
                      <div className=''>
                        <span>Intermediate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='skill-list-item shw cod'>
                <div className='skill-title'>
                  <h3>
                    CSS{" "}
                    <Image
                      src={'/icons/css-3.png'}
                      alt={'The HTML5 logo.'}
                      width={20}
                      height={20}
                      style={{
                        position: "relative",
                        top: "4px"
                      }}
                    />
                  </h3>
                </div>
                <div className='skill-list-item-wrapper'>
                  <div className='skill-perex'>
                    <p>
                      I know general CSS sctucture for responsive web design.
                    </p>
                  </div>
                  <div className='skill-tag-wrapper'>
                    <div className='skill-category'>
                      <div className=''>
                        <span>Coding</span>
                      </div>
                    </div>
                    <div className='skill-level'>
                      <div className=''>
                        <span>Intermediate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='skill-list-item shw cod'>
                <div className='skill-title'>
                  <h3>
                    JavaScript{" "}
                    <Image
                      src={'/icons/js.png'}
                      alt={'The javascript logo.'}
                      width={22}
                      height={22}
                      style={{
                        position: "relative",
                        top: "5px"
                      }}
                    />
                  </h3>
                </div>
                <div className='skill-list-item-wrapper'>
                  <div className='skill-perex'>
                    <p>I am learing JS and I can use it for GTM purposes.</p>
                  </div>
                  <div className='skill-tag-wrapper'>
                    <div className='skill-category'>
                      <div className=''>
                        <span>Programming</span>
                      </div>
                    </div>
                    <div className='skill-level'>
                      <div className=''>
                        <span>Adopting</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='skill-list-item shw cod'>
                <div className='skill-title'>
                  <h3>
                    Python{" "}
                    <Image
                      src={'/icons/python.svg'}
                      alt={'The python logo.'}
                      width={20}
                      height={20}
                      style={{
                        position: "relative",
                        top: "6px"
                      }}
                    />
                  </h3>
                </div>
                <div className='skill-list-item-wrapper'>
                  <div className='skill-perex'>
                    <p>I am learning python in my free time.</p>
                  </div>
                  <div className='skill-tag-wrapper'>
                    <div className='skill-category'>
                      <div className=''>
                        <span>Programming</span>
                      </div>
                    </div>
                    <div className='skill-level'>
                      <div className=''>
                        <span>Adopting</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='skill-list-item shw lan'>
                <div className='skill-title'>
                  <h3>
                    English{" "}
                    <Image
                      src={'/icons/great-britain-icon.png'}
                      alt={'The English flag.'}
                      width={20}
                      height={20}
                      style={{
                        position: "relative",
                        top: "5px"
                      }}
                    />
                  </h3>
                </div>
                <div className='skill-list-item-wrapper'>
                  <div className='skill-perex'>
                    <p>
                      I'm capable of using English in the professional field.
                    </p>
                  </div>
                  <div className='skill-tag-wrapper'>
                    <div className='skill-category'>
                      <div className=''>
                        <span>Languages</span>
                      </div>
                    </div>
                    <div className='skill-level'>
                      <div className=''>
                        <span>C1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='skill-list-item shw lan'>
                <div className='skill-title'>
                  <h3>
                    Deutsch{" "}
                    <Image
                      src={'/icons/germany-icon.png'}
                      alt={'The python logo.'}
                      width={20}
                      height={20}
                      style={{
                        position: "relative",
                        top: "5px"
                      }}
                    />
                  </h3>
                </div>
                <div className='skill-list-item-wrapper'>
                  <div className='skill-perex'>
                    <p>I am learning german language in my free time.</p>
                  </div>
                  <div className='skill-tag-wrapper'>
                    <div className='skill-category'>
                      <div className=''>
                        <span>Languages</span>
                      </div>
                    </div>
                    <div className='skill-level'>
                      <div className=''>
                        <span>A2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='skill-section'>
              <p className='skill-page-link'>
                You can find a structured skillset list on this{" "}
                <a href='/' className='hover-underline-animation'>
                  page
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
