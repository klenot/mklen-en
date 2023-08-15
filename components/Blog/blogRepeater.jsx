import Link from "next/link";

const { Client } = require("@notionhq/client");

export default async function BlogRepeater() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const response = await notion.databases.query({
    database_id: process.env.BLOG_DATABASE_ID,
    filter: {
      property: "Publish",
      select: {
        equals: "Published",
      },
    },
  });

  const blogs = {
    props: response.results,
  };

  return (
    <>
      <div className='blog-section'>
        <div className='blog-list-container'>
          {blogs.props.map((blog) => (
            <div key={blog.id} className='blog-list-item'>
              <Link href={"/"}>
                <div
                  className={blog.properties.AutoClassGenerator.formula.string}>
                  <div className='pill'>
                    <span>{blog.properties.Category.select.name}</span>
                  </div>
                </div>

                <div className='post-title'>
                  <h3>{blog.properties.PostTitle.title[0].plain_text}</h3>
                </div>

                <div className='post-perex'>
                  <p>{blog.properties.PostPerex.rich_text[0].plain_text}</p>
                </div>

                <div className='post-date'>
                  <p>{blog.properties.PostDate.date.start}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
