import {
  getPageBySlug,
  getBlocks,
  getPage,
  getDatabase,
} from "app/libs/notion-server-side-fetching.jsx";
import HeroBlogPost from "app/components/Blog/hero-blog-post.jsx";
import CodeBlock from "app/components/Shared/code-block";

const databaseId = process.env.BLOG_DATABASE_ID;

export async function generateStaticParams() {
  const blogs = await getDatabase(
    databaseId,
    "Publish",
    "Published",
    "Publish",
    "Published"
  );

  return blogs.results.map((blog) => ({
    slug: blog.properties.Slug.formula.string,
  }));
}

export async function generateMetadata({ params }) {
  const slug = await getPageBySlug(params.slug, databaseId);
  const metatitle =
    slug.results[0].properties.MetaTitle.rich_text[0]?.plain_text;
  const metadescription =
    slug.results[0].properties.MetaDescription.rich_text[0]?.plain_text;

  return {
    title: metatitle,
    description: metadescription,
  };
}

export default async function Post({ params }) {
  const slugObject = await getPageBySlug(params.slug, databaseId);
  const slug = slugObject.results[0];
  const page = await getPage(slug.id);
  const blocks = await getBlocks(slug.id);

  const Text = ({ text }) => {
    if (!text) {
      return null;
    }
    return text.map((value) => {
      const {
        annotations: { bold, code, color, italic, strikethrough, underline },
        text,
      } = value;
      return (
        <span
          className={[
            bold ? "bold" : "",
            code ? "code" : "",
            italic ? "italic" : "",
            strikethrough ? "strike-through" : "",
            underline ? "underline" : "",
          ].join(" ")}
          style={color !== "default" ? { color } : {}}
          key={text.content}>
          {text.link ? (
            <a className='blog-link' href={text.link.url}>
              {text.content}
              {" 🔗"}
            </a>
          ) : (
            text.content
          )}
        </span>
      );
    });
  };

  const renderContentTable = (block) => {
    const { type } = block;
    const value = block[type];

    switch (type) {
      case "heading_1":
        const preQueryh1 = value.rich_text[0].plain_text
          .replaceAll(" ", "-")
          .toLowerCase();
        const queryh1 = preQueryh1.replaceAll(/[^a-zA-Z0-9-]/g, "");
        return (
          <a
            className='table-of-content-item'
            href={`/blog/${page.properties.Slug.formula.string}#${queryh1}`}>
            <Text text={value.rich_text} />
          </a>
        );

      case "heading_2":
        const preQueryh2 = value.rich_text[0].plain_text
          .replaceAll(" ", "-")
          .toLowerCase();
        const queryh2 = preQueryh2.replaceAll(/[^a-zA-Z0-9-]/g, "");
        return (
          <a
            key={block.id}
            className='table-of-content-item'
            href={`/blog/${page.properties.Slug.formula.string}#${queryh2}`}>
            <Text text={value.rich_text} />
          </a>
        );

      case "heading_3":
        const preQueryh3 = value.rich_text[0].plain_text
          .replaceAll(" ", "-")
          .toLowerCase();
        const queryh3 = preQueryh3.replaceAll(/[^a-zA-Z0-9-]/g, "");
        return (
          <a
            key={block.id}
            href={`/blog/${page.properties.Slug.formula.string}#${queryh3}`}>
            <Text text={value.rich_text} />
          </a>
        );
      default:
        return null;
    }
  };

  const renderBlock = (block) => {
    const { type, id } = block;
    const value = block[type];
    switch (type) {
      case "paragraph":
        const textContent = value.rich_text
          .map((textObj) => textObj.text.content)
          .join("");
        const imageTagRegex = /<image>(.*?)<\/image><cap>(.*?)<\/cap>/g;
        const match = imageTagRegex.exec(textContent);

        if (match) {
          const imageUrl = match[1];
          const caption = match[2];
          return (
            <figure key={Math.random()} className='article-image-container'>
              <img src={imageUrl} alt={caption} className='article-img' />
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          );
        } else {
          return (
            <p key={Math.random()} className='article-text'>
              <Text text={value.rich_text} className='plain-text' />
            </p>
          );
        }
      case "heading_1":
        const preQueryh1 = value.rich_text[0].plain_text
          .replaceAll(" ", "-")
          .toLowerCase();
        const queryh1 = preQueryh1.replaceAll(/[^a-zA-Z0-9-]/g, "");
        return (
          <h1 key={Math.random()} id={queryh1} className='article-h1'>
            <Text text={value.rich_text} />
          </h1>
        );
      case "heading_2":
        const preQueryh2 = value.rich_text[0].plain_text
          .replaceAll(" ", "-")
          .toLowerCase();
        const queryh2 = preQueryh2.replaceAll(/[^a-zA-Z0-9-]/g, "");
        return (
          <h2 key={Math.random()} id={queryh2} className='article-h2'>
            <Text text={value.rich_text} />
          </h2>
        );
      case "heading_3":
        const preQueryh3 = value.rich_text[0].plain_text
          .replaceAll(" ", "-")
          .toLowerCase();
        const queryh3 = preQueryh3.replaceAll(/[^a-zA-Z0-9-]/g, "");
        return (
          <h3 key={Math.random()} id={queryh3} className='article-h3'>
            <Text text={value.rich_text} />
          </h3>
        );
      case "bulleted_list": {
        return (
          <ul key={Math.random()} className='article-bullet-list'>
            {value.children.map((child) => renderBlock(child))}
          </ul>
        );
      }
      case "numbered_list": {
        return (
          <ol key={Math.random()} className='article-numbered-list'>
            {value.children.map((child) => renderBlock(child))}
          </ol>
        );
      }
      case "bulleted_list_item":
      case "numbered_list_item":
        return (
          <li key={block.id}>
            <Text text={value.rich_text} />
            {!!value.children && renderNestedList(block)}
          </li>
        );
      case "to_do":
        return (
          <div key={Math.random()}>
            <label className='checkbox-label' htmlFor={id}>
              <input type='checkbox' id={id} defaultChecked={value.checked} />
              <span className='checkmark'></span>{" "}
              <Text text={value.rich_text} />
            </label>
          </div>
        );
      case "toggle":
        return (
          <details key={Math.random()} className='article-text'>
            <summary>
              <Text className='article-text' text={value.rich_text} />
            </summary>
            {block.children?.map((child) => (
              <div className='toggle-content' key={child.id}>
                {renderBlock(child)}
              </div>
            ))}
          </details>
        );
      case "child_page":
        return (
          <div key={Math.random()} className='aricle-section'>
            <strong>{value.title}</strong>
            {block.children.map((child) => renderBlock(child))}
          </div>
        );
      case "image":
        const src =
          value.type === "external" ? value.external.url : value.file.url;
        const caption = value.caption ? value.caption[0]?.plain_text : "";
        return (
          <figure key={Math.random()} className='article-image-container'>
            <img src={src} alt={caption} className='article-img' />
            {caption && <figcaption>{caption}</figcaption>}
          </figure>
        );
      case "divider":
        return <span className='blog-divider'>* * *</span>;
      case "quote":
        return (
          <blockquote key={Math.random()} className='quote'>
            <Text
              key={Math.random()}
              text={value.rich_text}
              className='plain-text'
            />
          </blockquote>
        );
      case "code":
        return (
          <CodeBlock key={Math.random()} code={value.rich_text[0].plain_text} />
        );
      case "file":
        const src_file =
          value.type === "external" ? value.external.url : value.file.url;
        const splitSourceArray = src_file.split("/");
        const lastElementInArray =
          splitSourceArray[splitSourceArray.length - 1];
        const caption_file = value.caption ? value.caption[0]?.plain_text : "";
        return (
          <figure key={Math.random()}>
            <div>
              📎{" "}
              <Link href={src_file} passHref>
                {lastElementInArray.split("?")[0]}
              </Link>
            </div>
            {caption_file && <figcaption>{caption_file}</figcaption>}
          </figure>
        );
      case "bookmark":
        const href = value.url;
        return (
          <a key={Math.random()} href={href} target='_blank'>
            {href}
          </a>
        );
      case "table": {
        return (
          <table key={Math.random()}>
            <tbody>
              {block.children?.map((child, i) => {
                const RowElement =
                  value.has_column_header && i == 0 ? "th" : "td";
                return (
                  <tr key={child.id}>
                    {child.table_row?.cells?.map((cell, i) => {
                      return (
                        <RowElement key={`${cell.plain_text}-${i}`}>
                          <Text text={cell} />
                        </RowElement>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      }
      case "column_list": {
        return (
          <div key={Math.random()} className='columns'>
            {block.children.map((block) => renderBlock(block))}
          </div>
        );
      }
      case "column": {
        return (
          <div key={Math.random()} className='column'>
            {block.children.map((child) => renderBlock(child))}
          </div>
        );
      }
      default:
        return `❌ Unsupported block (${
          type === "unsupported" ? "unsupported by Notion API" : type
        })`;
    }
  };

  return (
    <>
      <main>
        <HeroBlogPost
          title={page.properties.PostTitle.title[0]?.plain_text}
          perex={page.properties.PostPerex.rich_text[0]?.plain_text}
          ToC={
            <div className='hero-section table-of-contents-section'>
              <label className='table-of-contents-roll-down' htmlFor='touch'>
                <span>In this article</span>
              </label>
              <input type='checkbox' id='touch' />
              <ul className='slide'>
                {blocks?.map((block) => {
                  const renderedBlock = renderContentTable(block);
                  return renderedBlock ? (
                    <div key={block.id} className='table-of-contents-item'>
                      {renderedBlock}
                    </div>
                  ) : null;
                })}
              </ul>
            </div>
          }
          category={page.properties.Category.select.name}
        />
        <article className='article-section-container'>
          {blocks?.map((block) => (
            <div key={block.id} className='article-section'>
              {renderBlock(block)}
            </div>
          ))}
        </article>
      </main>
    </>
  );
}
