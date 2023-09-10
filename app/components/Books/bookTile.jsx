import Image from 'next/image'

export default function BookTile({ tileKey, title, author, src }) {
  return (
    <>
      <div key={tileKey} className='tile-item'>
        <Image
            src={src}
            sizes='100vw'
            style={{
              width: "100%",
              height: "auto",
              objectFit: "fill",
              border: "solid 0.01rem #f0f0f0",
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
