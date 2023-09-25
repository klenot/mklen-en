import Image from "next/image";
import { getBlocks, getPage } from "app/libs/notionServices";
import { getProjectBySlug } from "app/libs/getPageBySlug.ts";
import HeroProjectPage from "app/components/Projects/heroProjectPage";

export async function generateMetadata({ params }) {
  const slug = await getProjectBySlug(params.slug);
  const metadescription = slug.properties.MetaDescription.rich_text[0].plain_text;
  const metatitle = slug.properties.MetaTitle.rich_text[0].plain_text;

  return {
    title: metatitle,
    description: metadescription,
  };
}


export default async function ProjectPage({ params }) {

  const slug = await getProjectBySlug (params.slug);
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

  const renderBlock = (block) => {
    const { type, id } = block;
    const value = block[type];

    switch (type) {
      case "paragraph":
        return (
          <p className="service-text">
            <Text text={value.rich_text} className="plain-text"/>
          </p>
        );
      case "heading_1":
        return (
          <h1 id={block.id} className="service-h1">
            <Text text={value.rich_text} />
          </h1>
        );
      case "heading_2":
        return (
          <h2 id={block.id} className="service-h2">
            <Text text={value.rich_text} />
          </h2>
        );
      case "heading_3":
        return (
          <h3 id={block.id} className="service-h3">
            <Text text={value.rich_text} />
          </h3>
        );
      case "bulleted_list": {
        return (
          <ul className="service-bullet-list">
            {value.children.map((child) => renderBlock(child))}
          </ul>
        );
      }
      case "numbered_list": {
        return (
          <ol className="service-numbered-list">
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
          <details className="service-text">
            <summary>
              <Text className="service-text" text={value.rich_text} />
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
          <figure className="service-image-container">
            <img src={src} alt={caption} className="service-img"/>
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
        return (
          <section className="form-container">
            <div>
              <div>
                <h2 className='form-h2'>Get in touch.</h2>
                <form
                  action='https://formsubmit.co/mklen@mklenotic.cz'
                  method='POST'
                  className='form-wrapper'>
                  <label className='form-label' htmlFor='name-input'>
                    First and last name:
                  </label>
                  <input
                    className='form-input'
                    id='name-input'
                    type='text'
                    name='name'
                    maxLength={40}
                    placeholder='Start with your name here...'
                    required=''
                  />
                  <br />
                  <label className='form-label' htmlFor='email-input'>
                    Email:
                  </label>
                  <input
                    className='form-input'
                    id='email-input'
                    type='email'
                    name='email'
                    maxLength={40}
                    placeholder='your@email.com'
                    required=''
                  />
                  <br />
                  <label className='form-label' htmlFor='message-input'>
                    Message:
                  </label>
                  <textarea
                    className='form-input'
                    id='message-input'
                    rows={5}
                    name='message'
                    placeholder='Can we meet online?'
                    maxLength={220}
                    required=''
                    defaultValue={""}
                  />
                  <br />
                  <input type='hidden' name='_next' defaultValue='index.html' />
                  <input
                    type='hidden'
                    name='_autoresponse'
                    defaultValue='Hello :) Thank you for reaching out to me! I am going to respond as soon as I read your message. Have a productive day, MK.'
                  />
                  <input
                    type='hidden'
                    name='_subject'
                    defaultValue='New message submitted from mklenotic.com.'
                  />
                  <div className='button-wrapper'>
                    <button className='cta'>
                      <span>→ submit</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
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
        <HeroProjectPage
          h1={page.properties.ProjectName.title[0].plain_text}
          perex={page.properties.Description.rich_text[0].plain_text}
          buttonText={page.properties.ButtonText.rich_text[0].plain_text}
        />

        <section className='service-container'>
          {blocks.map((block) => (
            <div className='service-section' key={block.id}>
              {renderBlock(block)}
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
