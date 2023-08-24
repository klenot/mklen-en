import "styles/cv-styles.css";
import NavBar from "@/app/components/Shared/navBar";

export default function CurriculumVitae() {
  return (
    <>
      <NavBar />
      <>
        <section id='cv-hero-section'>
          <div className='cv-hero-container'>
            <div className='cv-hero-section-image'>
              <img
                className='cv-image'
                src='../media/cv-page/color_square.jpg'
                alt='A self portrait taken on November 1st in 2020.'
              />
            </div>
            <div className='cv-hero-section'>
              <div className='cv-perex'>
                <div className='cv-claim-wrapper'>
                  <p style={{ fontSize: "1.5rem" }}>I am</p>
                  <h1 className='cv-claim'>Marek Klenotič</h1>
                </div>
                <p className='long-text'>
                  <br />I know that time is a valuable asset and I am glad that
                  you are investing a few minutes of yours to me. Thank you for
                  reviewing my CV.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id='bio'>
          <div className='text-section-container'>
            <div>
              <div className='text-section section-title-h2'>
                <h2>BIO</h2>
              </div>
              <div className='text-section'>
                <p className='text-block'>
                  In 2017 I've applied for the account executive position
                  in&nbsp;a well known Czech digital marketing agency,
                  Pria&nbsp;System. s.r.o. Thanks to this given opportunity I
                  was able to work side by side with content, graphics,
                  web&nbsp;&amp; app development and digital marketing
                  professionals. After&nbsp;nearly a year I&nbsp;have been
                  offered&nbsp;a full time job as an account manager in the
                  company's branch in Prague. I&nbsp;was coordinating projects
                  for various clients.
                </p>
                <br />
                <p className='text-block'>
                  Meanwhile I&nbsp;have finished my studies and graduated from
                  Thomas Bata University with a masters in economics. At the end
                  of Covid pandemics outbreak I&nbsp;have applied for a job as a
                  project manager in In creative, a&nbsp;well established
                  digital agency in Brno. Besides leading projects for clients
                  I&nbsp;was developing their strategies as well as helping the
                  agency to enhance internal processes.
                </p>
                <br />
                <p className='text-block'>
                  I&nbsp;am currently working as a marketing manager in the
                  Czech communication platform, Targito.com. My responsibilities
                  include consulting marketing and communication strategy for
                  the product &amp;&nbsp;brand as well as bringing the creative
                  ideas to life. Together with my colleagues I&nbsp;maintain all
                  digital channels of Targito with emphasis on their
                  development. I&nbsp;am also responsible for designing all
                  essential digital marketing processes for the possible future
                  expansion.
                </p>
                <br />
                <p className='text-block'>
                  Lately I&nbsp;am also more focused on self growth as
                  a&nbsp;digital marketing professional. That means taking
                  available education courses, obtaining hard skills in the main
                  digital marketing areas and building my own personal brand in
                  the field.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id='career'>
          <div className='text-section-container'>
            <div>
              <div className='text-section section-title-h2'>
                <h2>Career</h2>
              </div>
              <div className='text-section section-title-h3'>
                <h3 className=''>Digital marketing</h3>
              </div>
              <div className='text-section'>
                <p className='text-block'>
                  Easy Software, Ltd. / Web&nbsp;&amp;&nbsp;marketing specialist
                  / 2022&nbsp;-&nbsp;to&nbsp;the&nbsp;present
                </p>
                <br />
                <p className='text-block'>
                  Targito.com, s.r.o / Marketing manager / 2022&nbsp;-&nbsp;2022
                </p>
                <br />
                <p className='text-block'>
                  In creative, s.r.o. / Project manager / 2021&nbsp;-&nbsp;2022
                </p>
                <br />
                <p className='text-block'>
                  Pria System, s.r.o. / Account manager / 2017&nbsp;-&nbsp;2019
                </p>
                <br />
              </div>
            </div>
          </div>
        </section>
        <section id='certification'>
          <div className='text-section-container'>
            <div className='text-section text-section-title-h2'>
              <h2>Certification</h2>
            </div>
            <div className='text-section-bullet'>
              <div className='bullet-wrapper'>
                <ul className='bullet-list'>
                  <li className=''>Mimo Web Development</li>
                  <li className=''>Mimo Python Core Concepts</li>
                  <li className=''>HubSpot Digital Marketing</li>
                  <li className=''>Google Display Ads</li>
                  <li className=''>Google Search Ads</li>
                  <li className=''>Advanced Google Analytics</li>
                  <li className=''>Google Tag Manager Basics</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id='skill-section'>
          <div className='skill-section-container'>
            <div className='skill-section section-title-h2'>
              <h2>I try to suck a bit less every day.</h2>
            </div>
            <div className='skill-section'>
              <p>I have always enjoyed the process of learning new things.</p>
            </div>
            <div className='skill-section'>
              <div className='skill-list-container'>
                <div className='skill-list-item'>
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
                          <span>Management</span>
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
                <div className='skill-list-item'>
                  <div className='skill-title'>
                    <h3>Strategy &amp; digital marketing direction</h3>
                  </div>
                  <div className='skill-list-item-wrapper'>
                    <div className='skill-perex'>
                      <p>
                        I love making structured strategies that make sense.
                      </p>
                    </div>
                    <div className='skill-tag-wrapper'>
                      <div className='skill-category'>
                        <div className=''>
                          <span>Digital marketing</span>
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
                <div className='skill-list-item'>
                  <div className='skill-title'>
                    <h3>Google Tag Manager</h3>
                  </div>
                  <div className='skill-list-item-wrapper'>
                    <div className='skill-perex'>
                      <p>
                        I can set up standard GTM tags and triggers in no time.
                      </p>
                    </div>
                    <div className='skill-tag-wrapper'>
                      <div className='skill-category'>
                        <div className=''>
                          <span>Analytic tools</span>
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
                <div className='skill-list-item'>
                  <div className='skill-title'>
                    <h3>GA4</h3>
                  </div>
                  <div className='skill-list-item-wrapper'>
                    <div className='skill-perex'>
                      <p>
                        I am able to set up, read and critically analyse web
                        data using GA4.
                      </p>
                    </div>
                    <div className='skill-tag-wrapper'>
                      <div className='skill-category'>
                        <div className=''>
                          <span>Analytic tools</span>
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
                <div className='skill-list-item'>
                  <div className='skill-title'>
                    <h3>
                      Content strategy
                      <br />
                      &amp; planning
                    </h3>
                  </div>
                  <div className='skill-list-item-wrapper'>
                    <div className='skill-perex'>
                      <p>
                        I can provide ideas, plan, goals &amp; suggested content
                        management tools.
                      </p>
                    </div>
                    <div className='skill-tag-wrapper'>
                      <div className='skill-category'>
                        <div className=''>
                          <span>Content</span>
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
                <div className='skill-list-item'>
                  <div className='skill-title'>
                    <h3>HTML5</h3>
                  </div>
                  <div className='skill-list-item-wrapper'>
                    <div className='skill-perex'>
                      <p>I am on the itermediate level in HTML coding.</p>
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
                <div className='skill-list-item'>
                  <div className='skill-title'>
                    <h3>CSS</h3>
                  </div>
                  <div className='skill-list-item-wrapper'>
                    <div className='skill-perex'>
                      <p>
                        I am familiar with the itermediate CSS structures and
                        workflows.
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
                <div className='skill-list-item'>
                  <div className='skill-title'>
                    <h3>English</h3>
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
                          <span>Advanced</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='skill-section'>
              <p className='skill-page-link'>
                You can find a structured skillset list on this{" "}
                <a className='hover-underline-animation'>page</a>.
              </p>
            </div>
          </div>
        </section>
        <section id='other-experience'>
          <div className='text-section-container'>
            <div>
              <div className='text-section section-title-h2'>
                <h2>Other experience</h2>
              </div>
              <div className='text-section section-title-h3'>
                <h3 className=''>Music management</h3>
              </div>
              <div className='text-section'>
                <p className='text-block'>
                  Band manager / Barbora Poláková / 2021&nbsp;-&nbsp;2022
                </p>
                <br />
                <p className='text-block'>
                  Music manager / Trocha Klidu / 2017&nbsp;-&nbsp;2021
                </p>
                <br />
              </div>
              <div className='text-section section-title-h3'>
                <h3 className=''>Production</h3>
              </div>
              <div className='text-section'>
                <p className='text-block'>
                  Co-founder of Šumperský majáles / 2017&nbsp;-&nbsp;2019
                </p>
                <br />
                <p className='text-block'>
                  Production of Zlínský majáles / 2017&nbsp;-&nbsp;2018
                </p>
                <br />
                <p className='text-block'>
                  Video production / 2017&nbsp;-&nbsp;2020
                </p>
                <br />
                <p className='text-block'>
                  Student Union UTB / 2015&nbsp;-&nbsp;2019
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id='more-about-me'>
          <div className='text-section-container'>
            <div>
              <div className='text-section section-title-h2'>
                <h2>More about me</h2>
              </div>
              <div className='text-section'>
                <p className='text-block'>
                  I come from a small Czech town in the heart of Jeseniky
                  mountains. I was always interested in doing various things at
                  once and didn't really care about common standards for growth.
                  I am still enjoying having a wide range of interests but I am
                  more focused on the quality of time spent doing them.
                </p>
                <br />
                <p className='text-block'>
                  Since I was a child, I’ve been curious about business
                  mechanics. For that reason I've decided to study economics and
                  business administration which I really enjoyed. This interest
                  remained to the present and I get to learn different business
                  approaches since it is an essential part of doing effective
                  marketing strategies.
                </p>
                <br />
                <p className='text-block'>
                  I am comfortable in the environment that motivates creativity
                  because I really enjoy thinking of new ideas. That includes
                  business ideas as well as ideas for marketing communication. I
                  highly value time and freedom.
                </p>
                <br />
                <p className='text-block'>
                  In my free time I love being with those who are close to me,
                  taking photos or learning chess.
                </p>
              </div>
              <div className='text-section text-section-image'>
                <img
                  className='signature-image'
                  src='../media/cv-page/podpis_mk_grey.png'
                  alt='My handwritten signature.'
                />
              </div>
              <div id='download' className='text-section'>
                <p className='text-block'>
                  Download my CV in{" "}
                  <span className='hover-underline-animation'>
                    <a href='https://drive.google.com/uc?export=download&id=1zTcRFuqaLZnjHeo0Eu4uDhq23Gfs8jO9'>
                      English
                    </a>
                  </span>{" "}
                  or{" "}
                  <span className='hover-underline-animation'>
                    <a href='https://drive.google.com/uc?export=download&id=1Y6rygl_dCLUzVXe03I8TZBsE7vvZar5D'>
                      Czech
                    </a>
                  </span>{" "}
                  language.
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
