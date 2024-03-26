import Image from "next/image";
import { getPageBySlug, getBlocks, getPage, getDatabase } from "app/libs/notion-server-side-fetching.jsx";  
import HeroServicePage from "app/components/Services/hero-service-page";
import Button from "app/components/Shared/cta-button";

const databaseId = process.env.SERVICES_DATABASE_ID;

export async function generateStaticParams() {
  const pages = await getDatabase(
    databaseId,
    "Publish",
    "Published",
    "Publish",
    "Published"
  );
 
  return pages.results.map((page) => ({
    slug: page.properties.Slug.formula.string,
  }))
}

export async function generateMetadata({ params }) {
  const slug = await getPageBySlug(params.slug, databaseId);
  const metadescription =
  slug.results[0].properties.MetaDescription.rich_text[0]?.plain_text;
  const metatitle = slug.results[0].properties.MetaTitle.rich_text[0]?.plain_text;

  return {
    title: metatitle,
    description: metadescription,
  };
}

export default async function ServicePage({ params }) {
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
            <a className='hover-underline-animation' href={text.link.url}>
              {text.content}
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
              <Image
                src={`/images/services/${imageUrl}`}
                alt={caption}
                className='article-img'
                width={1000}
                height={1000}
              />
              {/* {caption && <figcaption>{caption}</figcaption>} */}
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
          <details key={Math.random()} className='landing-page-text'>
            <summary>
              <Text className='landing-page-text' text={value.rich_text} />
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
        return <span>{value.plain_text}</span>;
      case "code":
        const heading = value.caption ? value.caption[0]?.plain_text : "";
        const text = value.rich_text[0]
        return (
          <div key={Math.random()} id='form' className='landing-page-form'>
            <h2 className='landing-page-h2 pb-2'>{heading}</h2>
            {value.rich_text[0] === undefined ? null : <p key={Math.random()} className='landing-page-form-text pb-2'>
              <Text text={value.rich_text} className='plain-text' />
            </p>}
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
                <button className='cta ctaSmall'>
                  <span className='button-text'>Submit</span>
                </button>
              </div>
            </form>
          </div>
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
        <HeroServicePage
          title={page.properties.ServiceName.title[0]?.plain_text}
          perex={page.properties.Description.rich_text[0]?.plain_text}
          buttonText={page.properties.ButtonText.rich_text[0] === undefined ? "" : page.properties.ButtonText.rich_text[0]?.plain_text}
        />

        <section className='landing-page-container'>
          {blocks?.map((block) => (
            <div className='landing-page-section' key={block.id}>
              {renderBlock(block)}
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
