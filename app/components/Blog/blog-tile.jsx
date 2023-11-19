import Link from "next/link";
import Image from "next/image";

export default function BlogTile({ props }) {
  return (
    <>
      <Link
        className='tile-wrapper'
        href={props.href}>
        <div className='tile-card'>
          <div className='tile-more-info'>
            <div className={props.class}>
              <div>
                <span className='tile-category-text'>
                  {props.category}
                </span>
              </div>
            </div>
          </div>
          <div className='tile-image-wrapper'>
            <Image
              src={props.imageSrc}
              width={300}
              height={200}
              alt={props.imageAlt}
              /* placeholder="blur" */
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>

          <div className='tile-info-wrapper'>
            <div className='tile-info'>
              <div>
                <div className='tile-date'>
                  <div>
                    <span className='tile-date-text'>
                      {props.date}
                    </span>
                  </div>
                </div>
                <h3>{props.title}</h3>
                <p className='pt-1 pb-1'>
                  {props.perex}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
