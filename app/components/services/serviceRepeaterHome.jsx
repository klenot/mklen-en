import Link from "next/link";
import getHomepageServices from "app/libs/getHpServices";

export default async function ServiceRepeaterHome() {
  const services = await getHomepageServices();

  return (
    <>
      <div className='service-container'>
        <div className='cards-container'>
          <div className='cards'>
            {services.map((service) => (
              <Link
              href={`/services/${service.properties.Slug.formula.string}`}
              >
              <div key={service.id} className='card'>
                <div>
                  <h3>{service.properties.ServiceName.title[0].plain_text}</h3>
                  <p className='service-description'>
                    {service.properties.Description.rich_text[0].plain_text}
                  </p>
                </div>
                <div className='service-category'>
                  <div className='pill'>
                    <span className='service-category-text'>
                      {service.properties.Category.select.name}
                    </span>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
