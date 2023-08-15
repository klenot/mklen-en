import Image from 'next/image'

export default function BookTile({ title, author, image }) {
  return (
    <>
      <div className='tile-item'>
        <Image
            src={"/images/book-covers/"+image.url+".png"}
            alt={image.alt}
            sizes='100vw'
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: "8px"
              }}
            width={2}
            height={3}
        />
        <div>
          <div className='tile-info-wrapper'>
            <p className='tile-perex'>{author}</p>
            <p className='tile-title'>{title}</p>
          </div>
        </div>
      </div>
    </>
  );
}
