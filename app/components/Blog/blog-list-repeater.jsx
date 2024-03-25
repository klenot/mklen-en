import { getDatabase } from "app/libs/notion-server-side-fetching.jsx";
import Link from "next/link";

const databaseId = process.env.BLOG_DATABASE_ID;

export async function generateStaticParams() {
  const blogs = await getDatabase(
    databaseId,
    "Publish",
    "Published",
    "Placement",
    "Homepage"
  );

  return blogs.results.map((blog) => ({
    slug: blog.properties.Slug.formula.string,
  }));
}

export default async function BlogListRepeater({
  filterA,
  categoryA,
  filterB,
  categoryB,
}) {
  const posts = await getDatabase(
    databaseId,
    filterA,
    categoryA,
    filterB,
    categoryB
  );

  return (
    <>
      <div className='blog-list-container'>
        {posts.results?.map((post) => (
          <Link
            className='blog-list-item'
            key={post.id}
            href={`/blog/${post.properties.Slug.formula.string}`}>
            <div key={post.properties.Slug.id}>
              <div className={"category"}>
                <div>
                  <span>{post.properties.Category.select.name}</span>
                </div>
              </div>

              <div className='post-title'>
                <h3>{post.properties.PostTitle.title[0].plain_text}</h3>
              </div>

              <div className='post-perex'>
                <p>{post.properties.PostPerex.rich_text[0]?.plain_text}</p>
              </div>

              <div className='post-date'>
                <p>
                  {new Date(post.properties.PostDate.date.start).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
