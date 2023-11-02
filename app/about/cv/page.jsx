import styles from "styles/cv.module.css";
import Image from "next/image";
import { getBlocks } from "app/libs/notionServices.jsx";
import HeroCv from "app/components/Cv/heroCv.jsx";
import SkillRepeater from "app/components/Skills/skillRepeater.jsx";
import Button from "app/components/Shared/ctaButton.jsx"

export const metadata = {
  title: "Read about my career",
  description:
    "I'm a experienced marktech consultant & PMI certified project manager. Find out all about my skills and projects in five minutes on my about page.",
};

export default async function CurriculumVitae() {
  const blocks = await getBlocks(process.env.CV_DATABASE_ID);

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
            <a className={styles.link} href={text.link.url}>
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

  /* const renderContentTable = (block) => {
    const { type } = block;
    const value = block[type];

    switch (type) {
      case "heading_1":
        const preQueryh1 = value.rich_text[0].plain_text
          .replaceAll(" ", "-")
          .toLowerCase();
        const queryh1 = preQueryh1.replaceAll(/[^a-zA-Z0-9-]/g, "");
        return (
          <div className='table-of-content-item'>
            <a
              key={block.id+1}
              className='table-of-content-item'
              href={`/blog/${page.properties.Slug.formula.string}#${queryh1}`}>
              <Text text={value.rich_text} />
            </a>
          </div>
        );

      case "heading_2":
        const preQueryh2 = value.rich_text[0].plain_text
          .replaceAll(" ", "-")
          .toLowerCase();
        const queryh2 = preQueryh2.replaceAll(/[^a-zA-Z0-9-]/g, "");
        return (
          <div className='table-of-content-item'>
            <a
              key={block.id+1}
              className='table-of-content-item'
              href={`/blog/${page.properties.Slug.formula.string}#${queryh2}`}>
              <Text text={value.rich_text} />
            </a>
          </div>
        );

      case "heading_3":
        const preQueryh3 = value.rich_text[0].plain_text
          .replaceAll(" ", "-")
          .toLowerCase();
        const queryh3 = preQueryh3.replaceAll(/[^a-zA-Z0-9-]/g, "");
        return (
          <div className='table-of-content-item'>
            <a
              key={block.id+1}
              href={`/blog/${page.properties.Slug.formula.string}#${queryh3}`}>
              <Text text={value.rich_text} />
            </a>
          </div>
        );

      case "paragraph":
        return null;

      case "bulleted_list": {
        return null;
      }
      case "numbered_list": {
        return null;
      }
      case "bulleted_list_item":
        return null;
      case "numbered_list_item":
        return null;
      case "to_do":
        return null;
      case "toggle":
        return null;
      case "child_page":
        return null;
      case "image":
        return null;
      case "divider":
        return null;
      case "quote":
        return null;
      case "code":
        return null;
      case "file":
        return null;
      case "bookmark":
        return null;
      case "table": {
        return null;
      }
      case "column_list": {
        return null;
      }
      case "column": {
        return null;
      }
    }
  }; */

  const renderBlock = (block) => {
    const { type, id } = block;
    const value = block[type];

    switch (type) {
      case "paragraph":
        return (
          <div key={block.id} className='article-section-container'>
            <p className='article-text'>
              <Text text={value.rich_text} className='plain-text' />
            </p>
          </div>
        );
      case "heading_1":
        const preQueryh1 = value.rich_text[0].plain_text
          .replaceAll(" ", "-")
          .toLowerCase();
        const queryh1 = preQueryh1.replaceAll(/[^a-zA-Z0-9-]/g, "");
        return (
          <div key={block.id} className='article-section-container'>
            <h1 id={queryh1} className='article-h1'>
              <Text text={value.rich_text} />
            </h1>
          </div>
        );
      case "heading_2":
        const preQueryh2 = value.rich_text[0].plain_text
          .replaceAll(" ", "-")
          .toLowerCase();
        const queryh2 = preQueryh2.replaceAll(/[^a-zA-Z0-9-]/g, "");
        return (
          <div key={block.id} className='article-section-container'>
            <h2 id={queryh2} className='article-h2'>
              <Text text={value.rich_text} />
            </h2>
          </div>
        );
      case "heading_3":
        const preQueryh3 = value.rich_text[0].plain_text
          .replaceAll(" ", "-")
          .toLowerCase();
        const queryh3 = preQueryh3.replaceAll(/[^a-zA-Z0-9-]/g, "");
        return (
          <div key={block.id} className='article-section-container'>
            <h3 id={queryh3} className='article-h3'>
              <Text text={value.rich_text} />
            </h3>
          </div>
        );
      case "bulleted_list": {
        return (
          <div key={block.id} className='article-section-container'>
            <ul className='article-bullet-list'>
              {value.children.map((child) => renderBlock(child))}
            </ul>
          </div>
        );
      }
      case "numbered_list": {
        return (
          <div key={block.id} className='article-section-container'>
            <ol className='article-numbered-list'>
              {value.children.map((child) => renderBlock(child))}
            </ol>
          </div>
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
          <div key={block.id} className='article-section-container'>
            <label className='checkbox-label' htmlFor={id}>
              <input type='checkbox' id={id} defaultChecked={value.checked} />
              <span className='checkmark'></span>{" "}
              <Text text={value.rich_text} />
            </label>
          </div>
        );
      case "toggle":
        return (
          <div key={block.id} className='article-section-container'>
            <details className='article-text'>
              <summary>
                <Text className='article-text' text={value.rich_text} />
              </summary>
              {block.children?.map((child) => (
                <div className='toggle-content' key={child.id}>
                  {renderBlock(child)}
                </div>
              ))}
            </details>
          </div>
        );
      case "child_page":
        return (
          <div key={children.id} className='article-section'>
            <strong>{value.title}</strong>
            {block.children.map((child) => renderBlock(child))}
          </div>
        );
      case "image":
        const src =
          value.type === "external" ? value.external.url : value.file.url;
        const caption = value.caption ? value.caption[0]?.plain_text : "";
        return (
          <div key={block.id} className='article-section-container'>
            <figure className={styles.signatureWrapper}>
              <Image
                src={src}
                alt={caption}
                width={300}
                height={150}
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
            </figure>
          </div>
        );
      case "divider":
        return (
          <div key={block.id} className='article-section-container'>
            <hr />
          </div>
        );
      case "quote":
        return (
          <div key={block.id} className='article-section-container'>
            <blockquote className='quote'>
              {"„ "}
              {value.rich_text[0].plain_text}
              {" ”"}
            </blockquote>
          </div>
        );
      case "code":
        return (
          <SkillRepeater />
        );
      case "file":
        const src_file =
          value.type === "external" ? value.external.url : value.file.url;
        const splitSourceArray = src_file.split("/");
        const lastElementInArray =
          splitSourceArray[splitSourceArray.length - 1];
        const caption_file = value.caption ? value.caption[0]?.plain_text : "";
        return (
          <div key={block.id} className='article-section-container'>
            <figure>
              <div>
                📎{" "}
                <Link href={src_file} passHref>
                  {lastElementInArray.split("?")[0]}
                </Link>
              </div>
              {caption_file && <figcaption>{caption_file}</figcaption>}
            </figure>
          </div>
        );
      case "bookmark":
        const buttonText = value.caption ? value.caption[0]?.plain_text : "";
        const href = value.url;
        return (
          <Button
            buttonText={buttonText}
            buttonLink={href}
            buttonSize={"small"}
          />
        );
      case "table": {
        return (
          <table key={block.id}>
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
          <div key={block.id} className='article-section-container'>
            <div className='columns'>
              {block.children.map((block) => renderBlock(block))}
            </div>
          </div>
        );
      }
      case "column": {
        return (
          <div key={block.id} className="column article-text">
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
      <HeroCv />
      {blocks.map((block) => renderBlock(block))}
    </>
  );
}
