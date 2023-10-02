import "styles/about-styles.css";
import HeroLandingPage from "app/components/Shared/heroLandingPage";
import ContentImage from "app/components/Shared/contentImage";
import TextBlock from "app/components/Shared/textBlock";

export const metadata = {
  title: "I aim for and efficient cooperation",
  description:
    "I'm a experienced marktech consultant & PMI certified project manager. Find out all about my skills and projects in five minutes on my about page.",
};

export default function Cooperation() {
  return (
    <>
      <main>
        <HeroLandingPage
          h1={"Cooperation guidelines"}
          perex={""}
          buttonText={"-"}
          buttonUrl={"about/cv"}
        />
        <ContentImage
          direction={"right"}
          heading={"Be like Carl"}
          text={
            "Carl believes that everyone wants a mutually beneficial cooperation, regardless of their different values. He suggests discussing expectations before making a deal."
          }
          image={{
            url: "/images/cooperation/black-hole.jpg",
            alt: "This is alt text.",
          }}
        />
        <ContentImage
          direction={"left"}
          heading={"Follow few values"}
          text={
            "Carl values time and expects it to be respected. Carl has a few guidelines for meetings, including advance planning and notice for cancellations. He expects agreements to be fulfilled. He values open and honest discussions."
          }
          image={{
            url: "/images/cooperation/black-hole.jpg",
            alt: "This is alt text.",
          }}
        />
        <ContentImage
          direction={"right"}
          heading={"Carl keeps his word"}
          text={
            "The cooperation process with Carl begins with a kick-off meeting to discuss goals, budget, and expectations. The first output is a roadmap with defined next steps and deliverables."
          }
          image={{
            url: "/images/cooperation/black-hole.jpg",
            alt: "This is alt text.",
          }}
        />
        <ContentImage
          direction={"left"}
          heading={"Communicate clearly, listen respectfully"}
          text={
            "Throughout the process, Carl will regularly consult on progress and provide reports and evaluations upon project completion."
          }
          image={{
            url: "/images/cooperation/black-hole.jpg",
            alt: "This is alt text.",
          }}
        />
        <div style={{ textAlign: "center" }}>
          <TextBlock heading={"-"} text={"Be like Carl."} />
        </div>

        <>
          {/* TEXT SECTION ONE COLUMN */}
          <section id='text-section-one-column'>
            <div className='text-section-container'>
              <div className='text-section text-section-title-h2'>
                <h2>Meetings and communication</h2>
              </div>
              <div className='text-section text-section-title-h3'>
                <h3>Organization</h3>
              </div>
              <div className='text-section'>
                <p>
                  I operate by two simple guidelines for meeting organization
                  and planning.
                </p>
              </div>
              <div className='text-section'>
                <p>
                  Our meetings should be planned beforehand - Usually for the
                  upcoming month.
                </p>
              </div>
              <div className='text-section'>
                <p>
                  Meeting gets canceled reasonably in advance. - At least 2-3
                  days before.
                </p>
              </div>
              <div className='text-section text-section-title-h3'>
                <h3>Meeting cancelation</h3>
              </div>
              <div className='text-section'>
                <p>
                  There are also few guidelines that apply in case you need to
                  cancel our meeting in a non-standard way.
                </p>
              </div>
              <div className='text-section'>
                <p>
                  If you cancel our appointment less than a week before the date
                  of the meeting I have to charge you 50% of the meeting
                  duration cost to compensate for the lost time.
                </p>
              </div>
              <div className='text-section'>
                <p>
                  If you cancel our appointment less than 24h before the meeting
                  I have to charge you 100% of the meeting duration cost to
                  compensate for the lost time.
                </p>
              </div>
              <div className='text-section'>
                <p>
                  Similarly if I have to cancel our meeting you will get the
                  equivalent of the meeting duration as a normal billable hours
                  for free.
                </p>
              </div>
              <div className='text-section text-section-title-h3'>
                <h3>Agreements</h3>
              </div>
              <div className='text-section'>
                <p>
                  If we both agree on something I expect that we fulfil our
                  agreement. Written agreement is usually better than a spoken
                  one. Good agreements make good friends.
                </p>
              </div>
              <div className='text-section text-section-title-h3'>
                <h3>Communication</h3>
              </div>
              <div className='text-section'>
                <p>
                  I am always open to a discussion as long as it's honest and in
                  a calm manner. Please be open about any topic you want to
                  discuss.
                </p>
              </div>
              <div className='text-section text-section-title-h3'>
                <h3>Time</h3>
              </div>
              <div className='text-section'>
                <p>
                  I believe that time is the most valuable asset. We should
                  always be respectful towards each others time.
                </p>
              </div>
              <div className='text-section'>
                <p>
                  The conditions above do not apply on occasions regarding your
                  health or family matters. Health and family are above business
                  matters.
                </p>
              </div>
            </div>
          </section>
          {/* TEXT SECTION ONE COLUMN */}
          <section id='text-section-one-column'>
            <div className='text-section-container'>
              <div className='text-section text-section-title-h2'>
                <h2>Cooperation workflow</h2>
              </div>
              <div className='text-section text-section-title-h3'>
                <h3>A kick-off meeting</h3>
              </div>
              <div className='text-section'>
                <p>
                  I need to get to know your business and ideally understand it
                  inside out.
                </p>
              </div>
              <div className='text-section'>
                <p>
                  Our cooperation always starts with a free kick-off meeting
                  where we discuss our expectations, your goals and budget
                  options.
                </p>
              </div>
              <div className='text-section'>
                <p>
                  This is non negotiable. Unfortunately I am no magician.
                  Without honest and complete information I can't do a
                  professional job that you expect.
                </p>
              </div>
              <div className='text-section text-section-title-h3'>
                <h3>Outputs &amp; Delivery</h3>
              </div>
              <div className='text-section'>
                <p>
                  The first output you can expect from is the cooperation
                  roadmap and the set of next steps that I suggest for
                  continuing our cooperation further.
                </p>
              </div>
              <div className='text-section'>
                <p>
                  This roadmap will include DOD (Definition of Done) statements
                  for all project/s or tasks. That way I am sure of what I’m
                  working on and you will know what you can expect.
                </p>
              </div>
              <div className='text-section'>
                <p>
                  Project deliverables and workflow may vary from type of the
                  service you want. Please read the service page of your desired
                  service as well.
                </p>
              </div>
              <div className='text-section text-section-title-h3'>
                <h3>Results &amp; Evaluation</h3>
              </div>
              <div className='text-section'>
                <p>
                  Lastly in the progress and after delivery of your desired
                  outputs I will be consulting the progress of work with you
                  regularly. You will also get a report and suggestions at the
                  end of each completed project.
                </p>
                <span id='cooperation-short-story' />
              </div>
            </div>
          </section>
          {/* TEXT SECTION ONE COLUMN */}
          <section id='text-section-one-column'>
            <div className='text-section-container'>
              <div className='text-section text-section-title-h2'>
                <h2>A short story of Carls believes</h2>
              </div>
              <div className='text-section'>
                <p>
                  Carl believes that everyone wants a mutually beneficial
                  cooperation, regardless of their different values.
                  He&nbsp;suggests discussing expectations before making a deal.
                  Carl has a few guidelines for meetings and communication,
                  including advance planning and notice for cancellations.
                  He&nbsp;expects agreements to be fulfilled and values open and
                  honest discussions.
                </p>
              </div>
              <div className='text-section'>
                <p>Carl values time and expects it to be respected.</p>
              </div>
              <div className='text-section'>
                <p>
                  The cooperation process with Carl begins with a kick-off
                  meeting to discuss goals, budget, and expectations. The first
                  output is a roadmap with defined next steps and deliverables.
                  Throughout the process, Carl will regularly consult on
                  progress and provide reports and evaluations upon project
                  completion.
                </p>
              </div>
              <div className='text-section'>
                <p>Be like Carl.</p>
              </div>
            </div>
          </section>
          {/* TEXT SECTION ONE COLUMN */}
          <section id='text-section-one-column'>
            <div className='text-section-container'>
              <div className='text-section text-section-title-h2'>
                <h2>Pricing &amp; Billables</h2>
              </div>
              <div className='text-section text-section-title-h3'>
                <h3>Fixed price</h3>
              </div>
              <div className='text-section'>
                <p>
                  This is usually the type of service that has one specific
                  purpose or output and one only. For example designing the
                  project plan for a new website.
                </p>
              </div>
              <div className='text-section'>
                <p>
                  Every fixed price has a 20% down payment with due right after
                  our kick-off meeting.
                </p>
              </div>
              <div className='text-section text-section-title-h3'>
                <h3>Hourly rate</h3>
              </div>
              <div className='text-section'>
                <p>
                  This is usually the type of service with long term purpose and
                  active participation in your project. For example leading your
                  digital marketing for specific period.
                </p>
              </div>
              <div className='text-section'>
                <p>
                  After an agreement on a budget we will have a hour estimate of
                  planned monthly billables.
                </p>
              </div>
              <div className='text-section'>
                <p>
                  As a main tracking system I am using the Toggle.com. I can use
                  the tracking system of your choice if needed and discussed in
                  advance.
                </p>
              </div>
              <div className='text-section'>
                <p>
                  You will get a billables report attached together with the
                  invoice after each month. Or you can get a report of my
                  billables during our meetings if needed.
                </p>
              </div>
            </div>
          </section>
        </>
      </main>
    </>
  );
}
