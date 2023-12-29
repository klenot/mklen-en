import styles from "styles/cv.module.css";
import Image from "next/image";
import { getBlocks } from "app/libs/notion-server-side-fetching.jsx";
import NavBar from "app/components/Shared/nav-bar-long.jsx"
import HeroCv from "app/components/Cv/hero-cv.jsx";
import SkillRepeater from "app/components/Skills/skill-repeater.jsx";
import Button from "app/components/Shared/cta-button.jsx"

export const metadata = {
  title: "Career journey",
  description:
    "I'm an experienced MarTech consultant & PMI certified project manager and here is a window to my career journey.",
};

export const revalidate = 600

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

  const renderBlock = (block) => {
    const { type, id } = block;
    const value = block[type];

    switch (type) {
      case "paragraph":
        return (
          <p key={Math.random()} className='article-text'>
            <Text text={value.rich_text} className='plain-text' />
          </p>
        );
      case "heading_1":
        const preQueryh1 = value.rich_text[0].plain_text
          .replaceAll(" ", "-")
          .toLowerCase();
        const queryh1 = preQueryh1.replaceAll(/[^a-zA-Z0-9-]/g, "");
        return (
          <h1 id={queryh1} className='article-h1'>
            <Text text={value.rich_text} />
          </h1>
        );
      case "heading_2":
        const preQueryh2 = value.rich_text[0].plain_text
          .replaceAll(" ", "-")
          .toLowerCase();
        const queryh2 = preQueryh2.replaceAll(/[^a-zA-Z0-9-]/g, "");
        return (
          <h2 id={queryh2} className='article-h2'>
            <Text text={value.rich_text} />
          </h2>
        );
      case "heading_3":
        const preQueryh3 = value.rich_text[0].plain_text
          .replaceAll(" ", "-")
          .toLowerCase();
        const queryh3 = preQueryh3.replaceAll(/[^a-zA-Z0-9-]/g, "");
        return (
          <h3 id={queryh3} className='article-h3'>
            <Text text={value.rich_text} />
          </h3>
        );
      case "bulleted_list": {
        return (
          <ul key={Math.random()} className='article-bullet-list'>
            {value.children?.map((child) => renderBlock(child))}
          </ul>
        );
      }
      case "numbered_list": {
        return (
          <ol className='article-numbered-list'>
            {value.children?.map((child) => renderBlock(child))}
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
                width={1500}
                height={500}
                className='landing-page-image'
              />
            </figure>
          );
      case "divider":
        return <hr />;
      case "quote":
        return (
          <blockquote className='quote'>
            
            {value.rich_text[0].plain_text}
            
          </blockquote>
        );
      case "code":
        return (
          <>
          <h2 id="skills" style={{fontWeight: "600"}} className="pt-10">Skills</h2>
          <p className="pt-2">I try to suck a bit less every day.</p>
          <SkillRepeater
            props={{
              container: "no"
            }}
          />
          </>
        );
      case "file":
        const src_file =
          value.type === "external" ? value.external.url : value.file.url;
        const splitSourceArray = src_file.split("/");
        const lastElementInArray =
          splitSourceArray[splitSourceArray.length - 1];
        const caption_file = value.caption ? value.caption[0]?.plain_text : "";
        return (
          <figure >
            <div key={Math.random()}>
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
          <div key={Math.random()} className={styles.columns}>
            {block.children?.map((block) => renderBlock(block))}
          </div>
        );
      }
      case "column": {
        return (
          <div key={Math.random()} className='column'>
            {block.children?.map((child) => renderBlock(child))}
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
      <NavBar/>
      <HeroCv />
      <article className={styles.cvSectionContainer}>
          {blocks?.map((block) => (
            <div key={block.id} className='article-section'>
              {renderBlock(block)}
            </div>
          ))}
        </article>
    </>
  );
}
