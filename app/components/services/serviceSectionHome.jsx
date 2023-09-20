import Link from "next/link";
import ServiceRepeaterHome from "./serviceRepeaterHome";

export default function ServiceSectionHome ({title, description, buttonText}) {

  return (
    <>
      <section id='service-section-home' className="pt-10 pb-10">
        <div className='service-container'>
          <div className='service-section pb-2'>
            <h2>{title}</h2>
          </div>
          <div className='service-section pb-1'>
            <p>{description}</p>
            <br />
          </div>
        </div>

        <ServiceRepeaterHome />

        <div className='pt-1'>
          <div className='service-container button-wrapper'>
            <button className='cta'>
              <Link href='/services.html'>
                <span>{buttonText}</span>
              </Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

/* import HeroMain from "@/components/Shared/heroMain";

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const response = await notion.databases.query({
  database_id: process.env.SERVICES_DATABASE_ID,
  filter: {
    property: "Publish",
    select: {
      equals: "Published",
    },
  },
});

const services = response.results;
console.log(services)

export default function Services() {
  return (
    <>
      <main>
        <HeroMain />
        <>
          <section id='service-section-2'>
            <div className='service-container'>
              <div className='service-section section-title-h2'>
                <h2>How I&nbsp;can help your business</h2>
              </div>
              <div className='service-section'>
                <p>
                  As an experienced martech specialist, project manager and
                  digital marketing consultant I&nbsp;can help you achieve your
                  business goals.
                </p>
                <br />
              </div>
            </div>
            
            <div className='service-container'>
              <div className='cards-container'>
                <div className='cards'>
                  {services.map((service) => (
                    <div key={service.id} className='card'>
                      <div>
                        <h3>{service.properties.Name.title[0].plain_text}</h3>
                        <p className='service-description'>
                          {
                            service.properties.Description.rich_text[0]
                              .plain_text
                          }
                        </p>
                      </div>
                      <div className='service-category'>
                        <div className='pill'>
                          <span className='service-category-text'>
                            {service.properties.Category.multi_select[0].name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='service-container'>
              <div className='hero-section hero-button-wrapper'>
                <a href='/services.html'>
                  <button className='cta'>
                    <span>explore all services</span>
                  </button>
                </a>
              </div>
            </div>
          </section>
        </>
      </main>
    </>
  );
} */

/* console.log(services) */

// Path to the Service Name (h3 Service Title)
/* console.log(services.props.results[0].properties.Name.title[0].plain_text) */

// Path to the Service Description (p Service Descripion)
/* console.log(services.props.results[0].properties.Description.rich_text[0].plain_text) */

// Path to the Service Price (Pill Service Price)
/* console.log(services.props.results[0].properties.Price.number) */

// Path to the Service Category (Pill Service Category)
/* console.log(services.props.results[0].properties.Category.multi_select[0].name) */
