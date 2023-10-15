import { getDatabaseWithAnd } from "app/libs/notionServices";
import Link from "next/link";
import Image from "next/image";

export default async function ServiceRepeater({
  filterA,
  categoryA,
  filterB,
  categoryB,
}) {
  const services = await getDatabaseWithAnd(
    process.env.SERVICES_DATABASE_ID,
    filterA,
    categoryA,
    filterB,
    categoryB
  );

  return (
    <>
      <div className='tile-container'>
        {services.map((service) => (
          <Link
            className='tile-wrapper'
            key={service.id}
            href={`/services/${service.properties.Slug.formula.string}`}>
            <div className='tile-card'>
            <div className='tile-more-info'>
                  <div
                    className={
                      service.properties.AutoClassGenerator.formula.string
                    }>
                    <div className='pill'>
                      <span className='tile-category-text'>
                        {service.properties.Category.select.name}
                      </span>
                    </div>
                  </div>
                </div>
              <div className='tile-image-wrapper'>
                
                <Image
                  src={"/images/blog/doge-computer.webp"}
                  width={300}
                  height={200}
                  alt={"Alt text."}
                />
              </div>

              <div className='tile-info-wrapper'>
                <div className='tile-info'>
                  <div>
                    <h3>
                      {service.properties.ServiceName.title[0].plain_text}
                    </h3>
                    <p className='pt-1 pb-1'>
                      {service.properties.Description.rich_text[0].plain_text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
