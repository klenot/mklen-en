import Image from "next/image";
import {
  getPageBySlug,
  getBlocks,
  getPage,
  GenerateKey,
} from "app/libs/notion-server-side-fetching.jsx";
import HeroProjectPage from "app/components/Projects/hero-project-page.jsx";
import Button from "app/components/Shared/cta-button";
import CodeBlock from "app/components/Shared/code-block";

const databaseId = process.env.PROJECTS_DATABASE_ID;

export async function generateMetadata({ params }) {
  const slug = await getPageBySlug(params.slug, databaseId);
  const metadescription =
    slug.results[0].properties.MetaDescription.rich_text[0].plain_text;
  const metatitle =
    slug.results[0].properties.MetaTitle.rich_text[0].plain_text;

  return {
    title: metatitle,
    description: metadescription,
  };
}

export default async function ProjectPage({ params }) {
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
          key={Math.random()}>
          {text.link ? (
            <a className="link" href={text.link.url}>
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

  const renderBlock = (block) => {
    const { type, id } = block;
    const value = block[type];

    switch (type) {
      case "paragraph":
        return (
          <p key={Math.random()} className='landing-page-text project-text'>
            <Text text={value.rich_text} className='plain-text' />
          </p>
        );
      case "heading_1":
        return (
          <h1 key={Math.random()} className='landing-page-h1'>
            <Text text={value.rich_text} />
          </h1>
        );
      case "heading_2":
        return (
          <h2 key={Math.random()} className='landing-page-h2'>
            <Text text={value.rich_text} />
          </h2>
        );
      case "heading_3":
        return (
          <h3 key={Math.random()} className='landing-page-h3'>
            <Text text={value.rich_text} />
          </h3>
        );
      case "bulleted_list": {
        return (
          <ul key={Math.random()} className='landing-page-bullet-list'>
            {value.children.map((child) => renderBlock(child))}
          </ul>
        );
      }
      case "numbered_list": {
        return (
          <ol key={Math.random()} className='landing-page-numbered-list'>
            {value.children.map((child) => renderBlock(child))}
          </ol>
        );
      }
      case "bulleted_list_item":
      case "numbered_list_item":
        return (
          <li key={Math.random()}>
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
          <details key={Math.random()} className='landing-page-text'>
            <summary>
              <Text className='landing-page-text' text={value.rich_text} />
            </summary>
            {block.children?.map((child) => (
              <div className='toggle-content' key={Math.random()}>
                {renderBlock(child)}
              </div>
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
          <figure key={Math.random()} className='landing-page-image-container'>
            <Image
              src={src}
              alt={caption}
              width={500}
              height={500}
              className='landing-page-image'
            />
          </figure>
        );
      case "divider":
        return <hr className='content-divider' key={Math.random()} />;
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
      case "text":
        return <span key={Math.random()}>{value.plain_text}</span>;
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
        const buttonText = value.caption ? value.caption[0]?.plain_text : "";
        const href = value.url;
        return (
          <Button
            key={Math.random()}
            buttonText={buttonText}
            buttonLink={href}
            buttonSize={"small"}
          />
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
                        <RowElement key={Math.random()}>
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
          <div
            key={Math.random()}
            className='landing-page-content-image-container'>
            {block.children.map((block) => renderBlock(block))}
          </div>
        );
      }
      case "column": {
        return (
          <div
            key={Math.random()}
            className='landing-page-content-image-section'>
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
        <HeroProjectPage
          title={page.properties.ProjectName.title[0].plain_text}
          sideKick={page.properties.Description.rich_text[0].plain_text}
        />
        <section className='landing-page-container'>
          {blocks?.map((block) => (
            <div className='landing-page-section' key={Math.random()}>
              {renderBlock(block)}
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
