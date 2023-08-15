import BookTile from "components/books/bookTile.jsx";

export default function BookRepeater() {
  return (
    <>
      <section id='more'>
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
              <BookTile
                title={
                  "How the World Really Works: A Scientist's Guide to Our Past, Present and Future"
                }
                author={"Václav Smil"}
                image={{
                  url: "vaclav-smil-how-the-world-really-works",
                  alt: "A book cover of How the World Really Works by Václav Smil",
                }}
              />

              <BookTile
                title={
                  "12 Rules for Life: An Antidote to Chaos"
                }
                author={"Jordan B. Peterson"}
                image={{
                  url: "12-rules-for-life",
                  alt: "A book cover of 12 Rules for Life: An Antidote to Chaos",
                }}
              />
              <BookTile
                title={
                  "How the World Really Works: A Scientist's Guide to Our Past, Present and Future"
                }
                author={"Václav Smil"}
                image={{
                  url: "vaclav-smil-how-the-world-really-works",
                  alt: "A book cover of How the World Really Works by Václav Smil",
                }}
              />
              <BookTile
                title={
                  "How the World Really Works: A Scientist's Guide to Our Past, Present and Future"
                }
                author={"Václav Smil"}
                image={{
                  url: "vaclav-smil-how-the-world-really-works",
                  alt: "A book cover of How the World Really Works by Václav Smil",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
