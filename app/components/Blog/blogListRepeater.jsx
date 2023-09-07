import Link from "next/link";
import BlogFilter from "./blogFilter";
import getHomepageBlogPosts from "@/app/libs/getHpBlogPosts";

export default async function BlogListRepeater() {
  const posts = await getHomepageBlogPosts();

  return (
    <>
      <BlogFilter />

      <div className='blog-section'>
        <div className='blog-list-container'>
          {posts.map((post) => (
            <Link className='blog-list-item' href={`/blog/${post.id}`}>
              <div key={post.id}>
                <div
                  className={post.properties.AutoClassGenerator.formula.string}>
                  <div className='pill'>
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
                  <p>{new Date(post.properties.PostDate.date.start).toLocaleString(
                              "en-US",
                              {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              }
                            )}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
