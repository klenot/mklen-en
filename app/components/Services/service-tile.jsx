import Link from "next/link";
import Image from "next/image";

export default function ServiceTile({ props }) {
  return (
    <>
      <Link
        className='tile-wrapper'
        href={props.href}>
        <div className='tile-card'>
          <div className='tile-image-wrapper'>
            <Image
              src={props.srcImage}
              width={300}
              height={200}
              alt={props.altImage}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>

          <div className='tile-info-wrapper'>
            <div className='tile-info'>
              <div>
                <h3>{props.serviceName}</h3>
                <p className='pt-1 pb-1'>
                  {props.serviceDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
