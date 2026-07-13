import { codeToHtml } from "shiki";

const THEME = "tokyo-night";
const BG = "#1a1b26";
const FG = "#c0caf5";

const DIAGRAM_LANGS = new Set([
  "text",
  "plaintext",
  "plain",
  "txt",
  "diagram",
  "ascii",
]);

const TAG_COLORS: Record<string, string> = {
  cyan: "#2dd4bf",
  orange: "#ff9e64",
  pink: "#f472b6",
  purple: "#bb9af7",
  muted: "#737373",
  green: "#9ece6a",
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function span(color: string, text: string): string {
  return `<span style="color:${color}">${text}</span>`;
}

function applyAutoColors(text: string): string {
  const placeholders: string[] = [];
  const stash = (html: string) => {
    placeholders.push(html);
    return `\x00${placeholders.length - 1}\x00`;
  };

  let result = text;

  result = result.replace(/\b[A-Z]{2,}(?: [A-Z]+)+\b/g, (match) =>
    stash(span(TAG_COLORS.cyan, match)),
  );

  result = result.replace(/Part [A-Z]:/g, (match) =>
    stash(span(TAG_COLORS.orange, match)),
  );

  result = result.replace(/\([^)]*\)/g, (match) =>
    stash(span(TAG_COLORS.muted, match)),
  );

  result = result.replace(
    /\b(?:JS|TS|UI|API|CSS|HTML|SQL|JSON|HTTP|SDK|CLI|IDE|RN|iOS|Android|Swift|Kotlin|React|Hermes|Stripe|Expo|Xcode|Gradle|npm|yarn|pnpm)\b/g,
    (match) => stash(span(TAG_COLORS.cyan, match)),
  );

  result = result.replace(
    /\b[A-Z][a-z]+(?:\/[A-Z][a-z]+)?\b/g,
    (match) => stash(span(TAG_COLORS.orange, match)),
  );

  result = result.replace(/\x00(\d+)\x00/g, (_, index: string) => {
    return placeholders[Number(index)] ?? "";
  });

  return result;
}

const MARKUP_RE =
  /\{(cyan|orange|pink|purple|muted|green)\}([\s\S]*?)(?:\{\/\1\}|\{\/\})/g;

function colorizePlainSegment(text: string): string {
  let result = "";
  let lastIndex = 0;

  for (const match of text.matchAll(MARKUP_RE)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      result += applyAutoColors(escapeHtml(text.slice(lastIndex, index)));
    }
    result += span(TAG_COLORS[match[1]], escapeHtml(match[2]));
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    result += applyAutoColors(escapeHtml(text.slice(lastIndex)));
  }

  return result || applyAutoColors(escapeHtml(text));
}

export function highlightDiagram(text: string): string {
  const lines = text.split("\n");
  const htmlLines = lines.map((line) => {
    const content = colorizePlainSegment(line);
    return `<span class="line"><span>${content || " "}</span></span>`;
  });

  return `<pre class="shiki ${THEME} diagram-block" style="background-color:${BG};color:${FG}" tabindex="0"><code>${htmlLines.join("\n")}</code></pre>`;
}

function isDiagramLanguage(language: string): boolean {
  return DIAGRAM_LANGS.has(language.toLowerCase());
}

export async function highlightCodeBlock(
  text: string,
  language: string,
): Promise<string> {
  const lang = language.replace(/ /g, "") || "text";

  if (isDiagramLanguage(lang)) {
    return highlightDiagram(text);
  }

  try {
    return await codeToHtml(text, { lang, theme: THEME });
  } catch {
    return highlightDiagram(text);
  }
}
