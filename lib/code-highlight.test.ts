import { describe, expect, it } from "vitest";
import { highlightDiagram } from "./code-highlight";

describe("highlightDiagram", () => {
  it("colors tech abbreviations cyan", () => {
    const html = highlightDiagram("Runs on Hermes (a JS engine)");
    expect(html).toContain('color:#2dd4bf');
    expect(html).toContain("JS");
    expect(html).toContain("Hermes");
  });

  it("colors parenthetical text muted", () => {
    const html = highlightDiagram("DATTOO APP (what user installs)");
    expect(html).toContain('color:#737373');
    expect(html).toContain("(what user installs)");
  });

  it("supports explicit markup tags", () => {
    const html = highlightDiagram("{cyan}Custom{/} label");
    expect(html).toContain('color:#2dd4bf');
    expect(html).toContain("Custom");
    expect(html).not.toContain("{cyan}");
  });

  it("escapes html characters", () => {
    const html = highlightDiagram("<script>alert(1)</script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<script>");
  });
});
