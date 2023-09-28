import { getBlocks, getPage } from "app/libs/notionServices.jsx";
import { getBlogBySlug } from "app/libs/getPageBySlug.ts";
import HeroBlogPost from "app/components/Blog/heroBlogPost.jsx";

export async function generateMetadata({ params }) {
  const slug = await getBlogBySlug(params.slug);
  const metadescription = slug.properties.MetaDescription.rich_text[0].plain_text;
  const metatitle = slug.properties.MetaTitle.rich_text[0].plain_text;

  return {
    title: metatitle,
    description: metadescription,
  };
}

export default async function Post({ params }) {
  const slug = await getBlogBySlug (params.slug);
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
            <a className="hover-underline-animation" href={text.link.url}>{text.content}</a>
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
        const preQueryh1 = (value.rich_text[0].plain_text).replaceAll(" ", "-").toLowerCase()
        const queryh1 = preQueryh1.replaceAll(/[^a-zA-Z0-9-]/g, "")
        return (
          <div className='table-of-content-item'>
            <a
              key={block.id}
              className='table-of-content-item'
              href={`/blog/${page.properties.Slug.formula.string}#${queryh1}`}>
              <Text text={value.rich_text} />
            </a>
          </div>
        );

      case "heading_2":
        const preQueryh2 = (value.rich_text[0].plain_text).replaceAll(" ", "-").toLowerCase()
        const queryh2 = preQueryh2.replaceAll(/[^a-zA-Z0-9-]/g, "")
        return (
          <div className='table-of-content-item'>
            <a
              key={block.id}
              className='table-of-content-item'
              href={`/blog/${page.properties.Slug.formula.string}#${queryh2}`}>
              <Text text={value.rich_text} />
            </a>
          </div>
        );

        case "heading_3":
        const preQueryh3 = (value.rich_text[0].plain_text).replaceAll(" ", "-").toLowerCase()
        const queryh3 = preQueryh3.replaceAll(/[^a-zA-Z0-9-]/g, "")
        return (
          <div className='table-of-content-item'>
            <a
              key={block.id}
              href={`/blog/${page.properties.Slug.formula.string}#${queryh3}`}>
              <Text text={value.rich_text} />
            </a>
          </div>
        );

      case "paragraph":
        return (
          null
        );
      
      case "bulleted_list": {
        return (
          null
        );
      }
      case "numbered_list": {
        return (
          null
        );
      }
      case "bulleted_list_item":
        return (
          null
        );
      case "numbered_list_item":
        return (
          null
        );
      case "to_do":
        return (
          null
        );
      case "toggle":
        return (
         null
        );
      case "child_page":
        return (
         null
        );
      case "image":
        return (
          null
        );
      case "divider":
        return (
          null
        );
      case "quote":
        return (
          null
        );
      case "code":
        return (
          null
        );
      case "file":
        return (
          null
        );
      case "bookmark":
        return (
          null
        );
      case "table": {
        return (
          null
        );
      }
      case "column_list": {
        return (
          null
        );
      }
      case "column": {
        return (
         null
        );
      }
      }
  };

  const renderBlock = (block) => {
    const { type, id } = block;
    const value = block[type];

    switch (type) {
      case "paragraph":
        return (
          <p className="article-text">
            <Text text={value.rich_text} className="plain-text"/>
          </p>
        );
      case "heading_1":
        const preQueryh1 = (value.rich_text[0].plain_text).replaceAll(" ", "-").toLowerCase()
        const queryh1 = preQueryh1.replaceAll(/[^a-zA-Z0-9-]/g, "")
        return (
          <h1 id={queryh1} className="article-h1">
            <Text text={value.rich_text} />
          </h1>
        );
      case "heading_2":
        const preQueryh2 = (value.rich_text[0].plain_text).replaceAll(" ", "-").toLowerCase()
        const queryh2 = preQueryh2.replaceAll(/[^a-zA-Z0-9-]/g, "")
        return (
          <h2 id={queryh2} className="article-h2">
            <Text text={value.rich_text} />
          </h2>
        );
      case "heading_3":
        const preQueryh3 = (value.rich_text[0].plain_text).replaceAll(" ", "-").toLowerCase()
        const queryh3 = preQueryh3.replaceAll(/[^a-zA-Z0-9-]/g, "")
        return (
          <h3 id={queryh3} className="article-h3">
            <Text text={value.rich_text} />
          </h3>
        );
      case "bulleted_list": {
        return (
          <ul className="article-bullet-list">
            {value.children.map((child) => renderBlock(child))}
          </ul>
        );
      }
      case "numbered_list": {
        return (
          <ol className="article-numbered-list">
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
           <div>
            <label className="checkbox-label" htmlFor={id}>
              <input type='checkbox' id={id} defaultChecked={value.checked} /><span className="checkmark"></span>{" "}
              <Text text={value.rich_text} />
            </label>
          </div>
        );
      case "toggle":
        return (
          <details className="article-text">
            <summary>
              <Text className="article-text" text={value.rich_text} />
            </summary>
            {block.children?.map((child) => (
              <div className="toggle-content" key={child.id}>{renderBlock(child)}</div>
            ))}
          </details>
        );
      case "child_page":
        return (
          <div className='aricle-section'>
            <strong>{value.title}</strong>
            {block.children.map((child) => renderBlock(child))}
          </div>
        );
      case "image":
        const src =
          value.type === "external" ? value.external.url : value.file.url;
        const caption = value.caption ? value.caption[0]?.plain_text : "";
        return (
          <figure className="article-image-container">
            <img src={src} alt={caption} className="article-img"/>
            {caption && <figcaption>{caption}</figcaption>}
          </figure>
        );
      case "divider":
        return <hr key={id} />;
      case "quote":
        return (
          <blockquote key={id} className="quote">{'„ '}{value.rich_text[0].plain_text}{" ”"}</blockquote>
        );
      case "code":
        return (
          <pre className="rich-code">
            <code className="rich-code-content" key={id}>{value.rich_text[0].plain_text}</code>
          </pre>
        );
      case "file":
        const src_file =
          value.type === "external" ? value.external.url : value.file.url;
        const splitSourceArray = src_file.split("/");
        const lastElementInArray =
          splitSourceArray[splitSourceArray.length - 1];
        const caption_file = value.caption ? value.caption[0]?.plain_text : "";
        return (
          <figure>
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
          <a href={href} target='_blank'>
            {href}
          </a>
        );
      case "table": {
        return (
          <table>
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
          <div className="columns">
            {block.children.map((block) => renderBlock(block))}
          </div>
        );
      }
      case "column": {
        return (
          <div className="column">
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
          h1={page.properties.PostTitle.title[0].plain_text}
          perex={page.properties.PostPerex.rich_text[0].plain_text}
          firstHeadingAnchor={"http://localhost:3000/blog/80397377-91ea-4363-bd30-40f3dedb9a21#50a4eee2-30a9-48e4-81be-922b0f40a770"}
          ToC={
            <div className="hero-section">
              {blocks.map((block) => (
                
                  renderContentTable(block)
                
              ))}
            </div>
          }
          readingTime={"7 minutes of reading"}
          category={page.properties.Category.select.name}
        />

        <article className='article-section-container'>
          {blocks.map((block) => (
            <div className='article-section' key={block.id}>
              {renderBlock(block)}
            </div>
          ))}
        </article>
      </main>
    </>
  );
}
