import Image from 'next/image'

export default function BookTile({ key, title, author, src }) {
  return (
    <>
      <div key={key} className='book'>
        <Image
            src={src}
            sizes='100vw'
            style={{
              width: "200px",
              height: "300px",
              objectFit: "fill",
              border: "solid 0.01rem #f0f0f0",
              borderRadius: "8px"
              }}
            width={2}
            height={3}
            alt='Book cover.'
        />
        <div>
          <div className='book-info'>
            <p className='book-author'>{author}</p>
            <p className='book-title'>{title}</p>
          </div>
        </div>
      </div>
    </>
  );
}
