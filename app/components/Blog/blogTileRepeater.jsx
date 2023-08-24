import Link from "next/link";
import BlogFilter from "./blogFilter";
import getBlogPosts from "app/libs/getBlogPosts.jsx";

export default async function BlogTileRepeater() {
  const posts = await getBlogPosts();

  return (
    <>
      <BlogFilter />
      <div className='blog-container'>
        <div className='cards-container'>
          <div className='cards'>
            {posts.map((post) => (
              <Link href='/blog'>
                <div key={post.id} className='post-card'>
                  <div>
                    <h3>{post.properties.PostTitle.title[0].plain_text}</h3>
                    <p className='service-description'>
                      {post.properties.PostPerex.rich_text[0].plain_text}
                    </p>
                  </div>

                  <div className='post-card-info'>
                    <div
                      className={
                        post.properties.AutoClassGenerator.formula.string
                      }>
                      <div className='pill'>
                        <span className='service-category-text'>
                          {post.properties.Category.select.name}
                        </span>
                      </div>
                    </div>
                    <div className='post-card-info-date'>
                      <div className='pill'>
                        <span className='post-card-info-date-text'>
                          {post.properties.PostDate.date.start}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
