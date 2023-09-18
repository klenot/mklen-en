import { getDatabase } from "app/libs/notionServices";
import BookTile from "app/components/Books/bookTile.jsx";

export default async function BookRepeater() {
  const books = await getDatabase(process.env.BOOKS_DATABASE_ID, "Publish", "Published", "Publish", "Published")

  return (
    <>
      <section id='book-section'>
        <div className='tile-section-container'>
          <div className='tile-section section-title-h2'>
            <h2>Project management</h2>
          </div>

          <div className='tile-section'>
            <p>
              In my project management blog posts you can explore various
              strategies and techniques for planning, executing, and delivering
              projects on time and within budget. From agile methodologies to
              project planning tools, I've got you covered.
            </p>
          </div>

          <div className='tile-section'>
            <div className='tile-container'>

              {books.map((book) => (
                <BookTile
                  key={book.id}
                  title={book.properties.BookName.title[0].plain_text}
                  author={book.properties.Author.rich_text[0].plain_text}
                  src={book.properties.BookCover.files[0].file.url}
                />
              ))}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
