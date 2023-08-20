import BlogFilter from "./blogFilter";
const { Client } = require("@notionhq/client");

export default async function BlogTileRepeater() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const response = await notion.databases.query({
    database_id: process.env.BLOG_DATABASE_ID,
    filter: {
      property: "Publish",
      select: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "PostDate",
        direction: "descending",
      },
    ],
  });

  const blogs = {
    props: response.results,
  };

  return (
    <>
      <BlogFilter />

      <div className='blog-container'>
        <div className='cards-container'>
          <div className='cards'>
            {blogs.props.map((blog) => (
              <div key={blog.id} className='post-card'>
                <div>
                  <h3>{blog.properties.PostTitle.title[0].plain_text}</h3>
                  <p className='service-description'>
                    {blog.properties.PostPerex.rich_text[0].plain_text}
                  </p>
                </div>

                <div className='post-card-info'>
                  <div
                    className={
                      blog.properties.AutoClassGenerator.formula.string
                    }>
                    <div className='pill'>
                      <span className='service-category-text'>
                        {blog.properties.Category.select.name}
                      </span>
                    </div>
                  </div>
                  <div className='post-card-info-date'>
                    <div className='pill'>
                      <span className='post-card-info-date-text'>
                        {blog.properties.PostDate.date.start}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
