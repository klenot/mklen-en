import Link from "next/link";
import { getDatabaseWithAnd } from "app/libs/notionServices";

export default async function BlogListRepeater({
  filterA,
  categoryA,
  filterB,
  categoryB,
}) {
  const posts = await getDatabaseWithAnd(
    process.env.BLOG_DATABASE_ID,
    filterA,
    categoryA,
    filterB,
    categoryB
  );

  return (
    <>
      
        <div className='blog-list-container'>
          {posts.map((post) => (
            <Link
              className='blog-list-item'
              href={`/blog/${post.properties.Slug.formula.string}`}>
              <div key={post.id}>
                <div
                  className={post.properties.AutoClassGenerator.formula.string}>
                  <div>
                    <span>{post.properties.Category.select.name}</span>
                  </div>
                </div>

                <div className='post-title'>
                  <h3>{post.properties.PostTitle.title[0].plain_text}</h3>
                </div>

                <div className='post-perex'>
                  <p>{post.properties.PostPerex.rich_text[0].plain_text}</p>
                </div>

                <div className='post-date'>
                  <p>
                    {new Date(
                      post.properties.PostDate.date.start
                    ).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      
    </>
  );
}
