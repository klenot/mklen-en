import type { BlogPost } from "./notion-types";

export const EXAMPLE_POST: BlogPost = {
  slug: "building-a-design-system-from-scratch",
  icon: "🎨",
  title: "Building a Design System From Scratch",
  description:
    "A comprehensive guide to building a design system that scales — from typography tokens to component architecture, with real-world examples and hard-won lessons.",
  category: "Design",
  date: "Jul 5, 2026",
  readingTime: "12 min read",
  blocks: [
    {
      type: "paragraph",
      text: [
        {
          text: "Design systems are the backbone of every consistent product experience. But starting one from zero is daunting — where do you begin when everything depends on everything else?",
        },
      ],
    },
    {
      type: "paragraph",
      text: [
        {
          text: "This post walks through the process I've refined over three years of building systems for products ranging from small startups to enterprise platforms with hundreds of screens.",
        },
      ],
    },
    {
      type: "heading_2",
      text: [{ text: "Start with typography" }],
    },
    {
      type: "paragraph",
      text: [
        {
          text: "Typography is the single most impactful decision you'll make. It determines spacing, component sizing, and overall rhythm. I recommend starting with a ",
        },
        { text: "Major Second (1.125)", bold: true },
        {
          text: " type scale for content-heavy applications — it provides enough contrast between levels without creating jarring jumps.",
        },
      ],
    },
    {
      type: "quote",
      text: [
        {
          text: "Typography is the craft of endowing human language with a durable visual form. — Robert Bringhurst",
          italic: true,
        },
      ],
    },
    {
      type: "paragraph",
      text: [
        { text: "The scale works like this: starting from a base size of " },
        { text: "16px", code: true },
        { text: ", each step multiplies by " },
        { text: "1.125", code: true },
        { text: " to produce the next size up." },
      ],
    },
    {
      type: "code",
      language: "typescript",
      text: "const RATIO = 1.125;\nconst BASE = 16;\n\nconst scale = {\n  sm:  BASE / RATIO,        // 14.22px\n  base: BASE,               // 16px\n  lg:  BASE * RATIO,        // 18px\n  xl:  BASE * RATIO ** 2,   // 20.25px\n  '2xl': BASE * RATIO ** 3, // 22.78px\n  '3xl': BASE * RATIO ** 4, // 25.63px\n  '4xl': BASE * RATIO ** 5, // 28.83px\n};",
      caption: "Generating the Major Second type scale programmatically",
    },
    {
      type: "heading_2",
      text: [{ text: "Spacing follows typography" }],
    },
    {
      type: "paragraph",
      text: [
        {
          text: "Once your type scale is set, derive your spacing from it. The key insight most designers miss: ",
        },
        {
          text: "the space above a heading should be larger than the space below it",
          bold: true,
        },
        {
          text: ". This groups the heading with the content it introduces, following the Gestalt principle of proximity.",
        },
      ],
    },
    {
      type: "callout",
      icon: "💡",
      text: [
        {
          text: "A heading's top margin should be roughly 1.5–2× its bottom margin. This creates a visual 'breathing room' that separates sections while binding the heading to its content.",
        },
      ],
    },
    {
      type: "heading_3",
      text: [{ text: "The spacing rules" }],
    },
    {
      type: "numbered_list_item",
      text: [
        { text: "Paragraph to paragraph: ", bold: true },
        { text: "1em (the body font size itself — 16px)" },
      ],
    },
    {
      type: "numbered_list_item",
      text: [
        { text: "Before H2: ", bold: true },
        { text: "3em (48px) — creates a clear section break" },
      ],
    },
    {
      type: "numbered_list_item",
      text: [
        { text: "After H2: ", bold: true },
        { text: "1em (16px) — binds heading to its first paragraph" },
      ],
    },
    {
      type: "numbered_list_item",
      text: [
        { text: "Before H3: ", bold: true },
        { text: "2em (32px) — subsection break, less dramatic" },
      ],
    },
    {
      type: "numbered_list_item",
      text: [
        { text: "After H3: ", bold: true },
        { text: "0.75em (12px) — tight coupling to content" },
      ],
    },
    {
      type: "heading_2",
      text: [{ text: "Color tokens" }],
    },
    {
      type: "paragraph",
      text: [
        {
          text: "Your color system doesn't need to be complex. Start with three layers:",
        },
      ],
    },
    {
      type: "bulleted_list_item",
      text: [
        { text: "Primitives", bold: true },
        { text: " — raw palette values (blue-500, gray-200)" },
      ],
    },
    {
      type: "bulleted_list_item",
      text: [
        { text: "Semantics", bold: true },
        { text: " — intent-based aliases (text-primary, border-subtle)" },
      ],
    },
    {
      type: "bulleted_list_item",
      text: [
        { text: "Components", bold: true },
        { text: " — scoped overrides (button-bg, card-border)" },
      ],
    },
    {
      type: "paragraph",
      text: [
        {
          text: "This three-tier approach means you can swap an entire theme by changing the semantic layer alone — primitives and component tokens stay stable.",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "heading_2",
      text: [{ text: "Component architecture" }],
    },
    {
      type: "paragraph",
      text: [
        { text: "The most successful systems I've built follow a " },
        {
          text: "sub-atomic → atomic → molecular",
          italic: true,
        },
        {
          text: " progression. Here's a comparison of common approaches:",
        },
      ],
    },
    {
      type: "table",
      rows: [
        ["Approach", "Pros", "Cons"],
        ["Flat library", "Simple, fast to start", "Doesn't scale past ~30 components"],
        [
          "Atomic design",
          "Clear hierarchy, reusable",
          "Can feel rigid for creative work",
        ],
        [
          "Compound components",
          "Flexible, composable",
          "Steeper learning curve",
        ],
      ],
    },
    {
      type: "heading_3",
      text: [{ text: "A practical example" }],
    },
    {
      type: "paragraph",
      text: [
        {
          text: "Let's look at how a Button component might be structured in a well-designed system:",
        },
      ],
    },
    {
      type: "code",
      language: "tsx",
      text: "type ButtonProps = {\n  variant: 'primary' | 'secondary' | 'ghost';\n  size: 'sm' | 'md' | 'lg';\n  children: React.ReactNode;\n  loading?: boolean;\n};\n\nexport function Button({ variant, size, children, loading }: ButtonProps) {\n  return (\n    <button\n      className={cn(\n        'inline-flex items-center justify-center font-medium',\n        'transition-colors focus-visible:outline-2',\n        variants[variant],\n        sizes[size],\n        loading && 'opacity-60 pointer-events-none'\n      )}\n    >\n      {loading && <Spinner className=\"mr-2\" />}\n      {children}\n    </button>\n  );\n}",
      caption: "A Button component with variant, size, and loading state",
    },
    {
      type: "heading_2",
      text: [{ text: "Documentation is not optional" }],
    },
    {
      type: "paragraph",
      text: [
        {
          text: "A design system without documentation is just a component library. The difference lies in the ",
        },
        { text: "why", italic: true },
        {
          text: " — documenting decisions, constraints, and usage guidelines transforms a set of components into a shared language.",
        },
      ],
    },
    {
      type: "to_do",
      text: [{ text: "Define naming conventions" }],
      checked: true,
    },
    {
      type: "to_do",
      text: [{ text: "Write component usage guidelines" }],
      checked: true,
    },
    {
      type: "to_do",
      text: [{ text: "Document spacing and layout tokens" }],
      checked: true,
    },
    {
      type: "to_do",
      text: [{ text: "Create migration guide from legacy styles" }],
      checked: false,
    },
    {
      type: "to_do",
      text: [{ text: "Record video walkthroughs" }],
      checked: false,
    },
    {
      type: "heading_2",
      text: [{ text: "Lessons learned" }],
    },
    {
      type: "paragraph",
      text: [
        {
          text: "After three years and four major versions, here's what I wish someone had told me at the start:",
        },
      ],
    },
    {
      type: "toggle",
      text: [{ text: "Ship v0.1 in a week, not v1.0 in a quarter" }],
      children: [
        {
          type: "paragraph",
          text: [
            {
              text: "The biggest mistake is spending months perfecting a system before anyone uses it. Get three components into production within days. Real usage will teach you more than any amount of planning.",
            },
          ],
        },
      ],
    },
    {
      type: "toggle",
      text: [{ text: "Adopt constraints aggressively" }],
      children: [
        {
          type: "paragraph",
          text: [
            {
              text: "Every \"just this once\" exception to your system erodes trust. Be strict about the rules, but make the rules easy to follow. If people keep breaking a constraint, the constraint is wrong — not the people.",
            },
          ],
        },
      ],
    },
    {
      type: "toggle",
      text: [{ text: "Measure adoption, not coverage" }],
      children: [
        {
          type: "paragraph",
          text: [
            {
              text: "Having 200 components means nothing if teams are still writing one-off styles. Track what percentage of new code uses the system. That's your real metric.",
            },
          ],
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "paragraph",
      text: [
        {
          text: "Building a design system is a marathon, not a sprint. Start small, stay consistent, and let real usage guide your decisions. The best system is the one your team actually uses.",
        },
      ],
    },
    {
      type: "bookmark",
      url: "https://typescale.com",
      caption: "TypeScale — Visual Type Scale Calculator",
    },
    {
      type: "image",
      url: "/blog/type-scale-example.png",
      caption:
        "The Major Second scale applied to a blog post — notice the subtle but clear hierarchy between heading levels",
    },
  ],
};
