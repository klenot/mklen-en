"use client";

import { useMemo, useState, useCallback } from "react";
import { useViewMode } from "@/hooks/useViewMode";
import { forMachinesMd } from "@/data/for-machines-content";
import ViewToggle from "@/components/layout/ViewToggle";

function renderLine(line: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(line.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-400 hover:text-white transition-colors"
      >
        [{match[1].toUpperCase()}]({match[2]})
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex === 0) return line;
  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }
  return parts;
}

function parseSection(lines: string[], keyOffset: number) {
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const key = keyOffset + i;

    if (line.startsWith("# ")) {
      elements.push(
        <div key={key} className="machines-h1">
          {renderLine(line)}
        </div>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <div key={key} className="machines-h2">
          {renderLine(line)}
        </div>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <div key={key} className="machines-h3">
          {renderLine(line)}
        </div>
      );
    } else if (line.startsWith("> ")) {
      elements.push(
        <div key={key} className="machines-quote">
          {renderLine(line)}
        </div>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={key} className="h-4" />);
    } else {
      elements.push(
        <div key={key} className="machines-p">
          {renderLine(line)}
        </div>
      );
    }
  }

  return elements;
}

function parseMd(md: string) {
  const allLines = md.split("\n");
  const sections: { lines: string[]; startIdx: number }[] = [];
  let current: string[] = [];
  let currentStart = 0;

  for (let i = 0; i < allLines.length; i++) {
    if (allLines[i] === "---") {
      if (current.length > 0) {
        sections.push({ lines: current, startIdx: currentStart });
      }
      current = [];
      currentStart = i + 1;
    } else {
      current.push(allLines[i]);
    }
  }
  if (current.length > 0) {
    sections.push({ lines: current, startIdx: currentStart });
  }

  return sections;
}

function CopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(forMachinesMd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-md border border-neutral-700 bg-black text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
          <path d="M10.5 5.5V3.5a1.5 1.5 0 0 0-1.5-1.5H3.5A1.5 1.5 0 0 0 2 3.5V9a1.5 1.5 0 0 0 1.5 1.5h2" />
        </svg>
      )}
    </button>
  );
}

export default function ForMachinesView() {
  const { mode } = useViewMode();
  const sections = useMemo(() => parseMd(forMachinesMd), []);

  if (mode !== "machines") return null;

  return (
    <div className="fixed inset-0 z-100 overflow-auto bg-black">
      <div className="max-w-[800px] mx-auto px-6 pt-5 flex items-center justify-end gap-3">
        <ViewToggle />
        <CopyButton />
      </div>
      <div className="max-w-[800px] mx-auto px-6 pt-10 pb-32 font-mono text-sm flex flex-col gap-10">
        {sections.map((section, idx) => (
          <div key={idx} className="flex w-full">
            <div className="shrink-0 w-px bg-neutral-800" />
            <div className="flex-1 min-w-0 px-8 py-4">
              {parseSection(section.lines, section.startIdx)}
            </div>
            <div className="shrink-0 w-px bg-neutral-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
