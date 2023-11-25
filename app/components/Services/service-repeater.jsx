"use client"

import Image from "next/image";
import Link from "next/link";
import { getDatabaseWithAnd } from "app/libs/notion-client-side-fetching.jsx";
import { useState, useEffect } from "react";
import TileSkeleton from "app/components/Shared/tile-skeleton.jsx";
import ServiceTile from "app/components/Services/service-tile.jsx";

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
        services?.map((service) => (
          <ServiceTile
            key={service.id}
            props={{
              href:`/services/${service.properties.Slug.formula.string}`,
              categoryName:`${service.properties.Category.select.name}`,
              serviceName:`${service.properties.ServiceName.title[0].plain_text}`,
              serviceDescription:`${service.properties.Description.rich_text[0].plain_text}`,
              srcImage:`${service.properties.Thumbnail.files[0] === undefined ? "/images/cv/podpis_mk_grey1.png" : service.properties.Thumbnail.files[0]?.file.url}`,
              altImage:`${service.properties.AltText.rich_text[0] === undefined ? "A signature of good fortune." : service.properties.AltText.rich_text[0]?.plain_text}`,
            }}
          />
        ))}
      </div>
    </>
  );
}
