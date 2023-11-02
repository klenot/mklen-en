"use client"

import Image from "next/image";
import Link from "next/link";
import { getDatabaseWithAnd } from "app/libs/notionServices";
import { useState, useEffect } from "react";
import TileSkeleton from "app/components/Shared/tileSkeleton.jsx";

export default function ServiceRepeater({
  filterA,
  categoryA,
  filterB,
  categoryB,
}) {
  const [services, setServices] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const services = await getDatabaseWithAnd(
        process.env.SERVICES_DATABASE_ID,
        filterA,
        categoryA,
        filterB,
        categoryB
      );
      setServices(services);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className='tile-container'>
        {isLoading === true ? <TileSkeleton/> :
        services.map((service) => (
          <Link
            className='tile-wrapper'
            href={`/services/${service.properties.Slug.formula.string}`}>
            <div key={service.id} className='tile-card'>
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
                  src={service.properties.Thumbnail.files[0] === undefined ? "/images/cv/podpis_mk_grey1.png" : service.properties.Thumbnail.files[0].file.url}
                  width={300}
                  height={200}
                  alt={service.properties.AltText.rich_text[0] === undefined ? "A signature of good fortune." : service.properties.AltText.rich_text[0].plain_text}
                  /* placeholder="blur" */
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
