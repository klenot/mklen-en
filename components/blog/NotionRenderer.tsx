"use client";

import { useState } from "react";
import Image from "next/image";
import type { NotionBlock, RichText } from "@/data/notion-types";

function RichTextRenderer({ segments }: { segments: RichText[] }) {
  return (
    <>
      {segments.map((segment, i) => {
        let node: React.ReactNode = segment.text;

        if (segment.code) {
          node = (
            <code className="rounded bg-black/5 px-[0.4em] py-[0.15em] text-[0.875em] font-mono text-black">
              {node}
            </code>
          );
        }
        if (segment.bold)
          node = <strong className="font-semibold">{node}</strong>;
        if (segment.italic) node = <em>{node}</em>;
        if (segment.strikethrough) node = <s>{node}</s>;
        if (segment.underline) node = <u>{node}</u>;
        if (segment.link) {
          node = (
            <a
              href={segment.link}
              className="underline decoration-black/30 underline-offset-2 transition-colors hover:decoration-blue-500 hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              {node}
            </a>
          );
        }

        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

function HighlightedCode({
  html,
  caption,
}: {
  html: string;
  caption?: string;
}) {
  return (
    <figure className="blog-block-spacing">
      <div
        className="code-block overflow-x-auto rounded-md border border-black/10 text-[0.8125rem] leading-[1.7] font-mono [&_pre]:p-[1.25em] [&_pre]:m-0 [&_pre]:bg-[#fafafa]! [&_code]:text-[0.8125rem] [&_code]:leading-[1.7]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {caption && (
        <figcaption className="mt-2.5 text-[0.8125rem] font-mono text-black/70 leading-normal">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function PlainCode({ text, caption }: { text: string; caption?: string }) {
  return (
    <figure className="blog-block-spacing">
      <pre className="overflow-x-auto rounded-md border border-black/10 bg-[#fafafa] p-[1.25em]">
        <code className="block text-[0.8125rem] leading-[1.7] font-mono text-black">
          {text}
        </code>
      </pre>
      {caption && (
        <figcaption className="mt-2.5 text-[0.8125rem] font-mono text-black/70 leading-normal">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function ImageBlock({ url, caption }: { url: string; caption?: string }) {
  return (
    <figure className="blog-block-spacing">
      <Image
        src={url}
        alt={caption || ""}
        width={1200}
        height={800}
        className="h-auto w-full rounded-md border border-black/10"
        sizes="(max-width: 640px) 100vw, 640px"
      />
      {caption && (
        <figcaption className="mt-2.5 text-[0.8125rem] font-mono text-black/70 leading-normal">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function TableBlock({ rows }: { rows: string[][] }) {
  if (rows.length === 0) return null;
  const [header, ...body] = rows;

  return (
    <div className="blog-block-spacing overflow-x-auto">
      <table className="w-full border-collapse text-[0.875rem] font-mono">
        <thead>
          <tr>
            {header.map((cell, i) => (
              <th
                key={i}
                className="border-b border-black/15 px-[1em] py-[0.6em] text-left font-semibold text-black"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="border-b border-black/[0.07] px-[1em] py-[0.6em] text-[#1a1a1a]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ToggleBlock({
  text,
  blocks,
  codeHtmlMap,
}: {
  text: RichText[];
  blocks: NotionBlock[];
  codeHtmlMap: Record<number, string>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="blog-list-spacing group"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="cursor-pointer list-none text-[1rem] leading-[1.75] font-medium text-black select-none [-webkit-tap-highlight-color:transparent]">
        <span className="mr-[0.4em] inline-block transition-transform duration-200 group-open:rotate-90">
          ▸
        </span>
        <RichTextRenderer segments={text} />
      </summary>
      <div className="mt-3 pl-[1.25em] border-l-2 border-black/10">
        <BlockRenderer blocks={blocks} codeHtmlMap={codeHtmlMap} />
      </div>
    </details>
  );
}

function BlockRenderer({
  blocks,
  codeHtmlMap,
}: {
  blocks: NotionBlock[];
  codeHtmlMap: Record<number, string>;
}) {
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item"
    ) {
      const listType = block.type;
      const items: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === listType) {
        items.push(blocks[i]);
        i++;
      }

      const Tag = listType === "numbered_list_item" ? "ol" : "ul";
      elements.push(
        <Tag
          key={`list-${i}`}
          className={`blog-list-spacing flex flex-col gap-[0.35em] pl-0 ${
            listType === "numbered_list_item" ? "list-decimal" : "list-disc"
          } list-inside marker:text-black`}
        >
          {items.map((item, j) => (
            <li
              key={j}
              className="text-[1rem] leading-[1.75] font-mono text-[#1a1a1a]"
            >
              {"text" in item && (
                <RichTextRenderer segments={item.text as RichText[]} />
              )}
            </li>
          ))}
        </Tag>,
      );
      continue;
    }

    if (block.type === "to_do") {
      const items: NotionBlock[] = [];
      while (i < blocks.length && blocks[i].type === "to_do") {
        items.push(blocks[i]);
        i++;
      }
      elements.push(
        <ul
          key={`todo-${i}`}
          className="blog-list-spacing flex flex-col gap-[0.4em]"
        >
          {items.map((item, j) => {
            if (item.type !== "to_do") return null;
            return (
              <li key={j} className="flex items-center gap-[0.5em]">
                <span
                  className={`h-[0.5em] w-[0.5em] shrink-0 rounded-full border border-black ${
                    item.checked ? "bg-black" : ""
                  }`}
                />
                <span
                  className={`text-[1rem] leading-[1.75] font-mono ${
                    item.checked
                      ? "text-black/50 line-through"
                      : "text-[#1a1a1a]"
                  }`}
                >
                  <RichTextRenderer segments={item.text} />
                </span>
              </li>
            );
          })}
        </ul>,
      );
      continue;
    }

    switch (block.type) {
      case "heading_1":
        elements.push(
          <h1 key={i} className="blog-h1">
            <RichTextRenderer segments={block.text} />
          </h1>,
        );
        break;

      case "heading_2":
        elements.push(
          <h2 key={i} className="blog-h2">
            <RichTextRenderer segments={block.text} />
          </h2>,
        );
        break;

      case "heading_3":
        elements.push(
          <h3 key={i} className="blog-h3">
            <RichTextRenderer segments={block.text} />
          </h3>,
        );
        break;

      case "paragraph":
        elements.push(
          <p key={i} className="blog-paragraph">
            <RichTextRenderer segments={block.text} />
          </p>,
        );
        break;

      case "quote":
        elements.push(
          <blockquote
            key={i}
            className="blog-block-spacing border-l-[3px] border-black pl-[1em] text-[1rem] leading-[1.75] font-mono text-[#1a1a1a]"
          >
            <RichTextRenderer segments={block.text} />
          </blockquote>,
        );
        break;

      case "callout":
        elements.push(
          <aside
            key={i}
            className="blog-block-spacing flex gap-[0.75em] rounded-md bg-[#fafafa] border border-black/10 px-[1em] py-[1em]"
          >
            <span className="text-[1.125rem] leading-none mt-[0.2em] shrink-0">
              {block.icon}
            </span>
            <p className="text-[0.9375rem] leading-[1.7] font-mono text-[#1a1a1a]">
              <RichTextRenderer segments={block.text} />
            </p>
          </aside>,
        );
        break;

      case "divider":
        elements.push(
          <hr key={i} className="blog-divider border-none h-px bg-black/10" />,
        );
        break;

      case "code":
        if (codeHtmlMap[i]) {
          elements.push(
            <HighlightedCode
              key={i}
              html={codeHtmlMap[i]}
              caption={block.caption}
            />,
          );
        } else {
          elements.push(
            <PlainCode key={i} text={block.text} caption={block.caption} />,
          );
        }
        break;

      case "image":
        elements.push(
          <ImageBlock key={i} url={block.url} caption={block.caption} />,
        );
        break;

      case "bookmark":
        elements.push(
          <a
            key={i}
            href={block.url}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-block-spacing flex items-center gap-[0.75em] rounded-md border border-black/10 px-[1em] py-[0.75em] transition-colors hover:border-black/25 hover:bg-[#fafafa]"
          >
            <span className="text-[0.8125rem] font-mono text-black truncate">
              {block.url}
            </span>
            {block.caption && (
              <span className="ml-auto text-[0.8125rem] font-mono text-black/70 shrink-0">
                {block.caption}
              </span>
            )}
          </a>,
        );
        break;

      case "table":
        elements.push(<TableBlock key={i} rows={block.rows} />);
        break;

      case "equation":
        elements.push(
          <div
            key={i}
            className="blog-block-spacing text-center text-[1.125rem] font-mono text-black py-[0.5em]"
          >
            {block.expression}
          </div>,
        );
        break;

      case "toggle":
        elements.push(
          <ToggleBlock
            key={i}
            text={block.text}
            blocks={block.children}
            codeHtmlMap={codeHtmlMap}
          />,
        );
        break;

      default:
        break;
    }

    i++;
  }

  return <>{elements}</>;
}

export default function NotionRenderer({
  blocks,
  codeHtmlMap = {},
}: {
  blocks: NotionBlock[];
  codeHtmlMap?: Record<number, string>;
}) {
  return (
    <div className="blog-content">
      <BlockRenderer blocks={blocks} codeHtmlMap={codeHtmlMap} />
    </div>
  );
}
