import Image from "next/image";
import { getBlocks } from "app/libs/notion-server-side-fetching.jsx";
import NavBar from "app/components/Shared/nav-bar-long.jsx";
import HeroLandingPage from "app/components/Shared/hero-landing-page.jsx";
import ShortFooter from "app/components/Shared/footer-short.jsx";
import Button from "app/components/Shared/cta-button.jsx";

export const metadata = {
  title: "Cooperation guidelines",
  description:
    "I aim for mutually benefitial cooperation. Read about my core values and get a sense of what cooperation you can expect.",
};

export default async function Cooperation() {
  const blocks = await getBlocks(process.env.COOP_DATABASE_ID);

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
            <a className='hover-underline-animation' href={text.link.url}>
              {Math.random()}
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
          <p key={Math.random()} className='landing-page-text'>
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
        return (
          <div key={Math.random()} id='form' className='landing-page-form'>
            <h2 className='form-h2'>Reach out to me directly</h2>
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
                  <tr key={Math.random()}>
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
      <NavBar/>
      <main>
        <HeroLandingPage
          title={"Cooperation"}
          sideKick={""}
          button={{
            text: "",
            link:"",
          }}
        />
        <section className='landing-page-container'>
          {blocks.map((block) => (
            <div className='landing-page-section' key={block.id}>
              {renderBlock(block)}
            </div>
          ))}
        </section>
      </main>
      <ShortFooter/>
    </>
  );
}
