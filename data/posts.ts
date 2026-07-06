export type Post = {
  slug: string;
  icon: string;
  title: string;
  description: string;
  content: string;
  category: string;
  date: string;
  tag: "blog" | "project";
  coverImage?: string;
};

export const POSTS: Post[] = [
  {
    slug: "404-cat-not-found",
    icon: "🐾",
    title: "404: Cat Not Found",
    description:
      "The moment I open my laptop he becomes a warm paperweight on the exact key I need. A field study in feline sabotage and the quiet art of doing absolutely nothing productive.",
    content:
      "The moment I open my laptop he becomes a warm paperweight on the exact key I need. A field study in feline sabotage and the quiet art of doing absolutely nothing productive.\n\nIt starts innocuously enough. I sit down, open the lid, and within thirty seconds a furry mass materializes from thin air onto the keyboard. Not beside it. Not near it. On it. Specifically on the exact key combination that triggers some obscure system shortcut I didn't know existed.\n\nI've tried everything. Decoy keyboards. Heated pads placed strategically nearby. A second laptop running nothing but a screensaver of fish. He ignores all of it with the quiet contempt of a creature who has transcended material desire — except for the desire to sit on my shift key.\n\nThe real tragedy is that he's productive. Last Tuesday he somehow closed three Jira tickets and mass-replied to a Slack thread with 'hhhhhhhhhhh'. My manager said it was the most concise standup update he'd ever seen.",
    category: "Chaos",
    date: "Jun 28, 2026",
    tag: "blog",
  },
  {
    slug: "the-midnight-zoomies-manifesto",
    icon: "🐈",
    title: "The Midnight Zoomies Manifesto",
    description:
      "At precisely 3am physics stops applying. Here is what quantum mechanics can teach us about a cat sprinting up a wall for no discernible reason whatsoever.",
    content:
      "At precisely 3am physics stops applying. Here is what quantum mechanics can teach us about a cat sprinting up a wall for no discernible reason whatsoever.\n\nI've documented the phenomenon across forty-seven nights. The pattern is always the same: deep silence, a distant thud, and then what can only be described as a small mammal breaking the sound barrier in a hallway.\n\nScientists call it Frenetic Random Activity Periods. I call it existential terrorism. The cat goes from a state of perfect rest to maximum velocity with zero transition. There is no acceleration phase. He simply exists in one state and then the other, like a quantum particle deciding which slit to pass through.\n\nThe wall-running is the part that truly defies explanation. Three full steps up a vertical surface before gravity remembers its job. I've measured the angle. I've consulted physicists. They stopped returning my emails after the fourth video.",
    category: "Science",
    date: "Jun 21, 2026",
    tag: "blog",
  },
  {
    slug: "my-cat-reviewed-my-code",
    icon: "😼",
    title: "My Cat Reviewed My Code",
    description:
      "She strolled across the keyboard, somehow closed three tickets and opened a merge conflict. Honestly a stronger showing than most of my interns this quarter.",
    content:
      "She strolled across the keyboard, somehow closed three tickets and opened a merge conflict. Honestly a stronger showing than most of my interns this quarter.\n\nIt happened during a particularly intense debugging session. I'd been staring at a race condition for hours when she decided my keyboard was the ideal location for a bath. In the process, she:\n\n1. Ran `git stash` (saving work I'd forgotten about)\n2. Opened a new terminal tab\n3. Typed something that, against all probability, was valid Python\n4. Somehow approved a pull request\n\nThe PR she approved actually had a subtle bug in it, which she then introduced a fix for by stepping on the right keys in the right order. The fix was technically correct but used a coding style that would fail every linter we have.\n\nI've since added her as a required reviewer on all critical paths. Her approval rate is 100% — she has never once rejected a PR. This makes her more popular than any human reviewer on the team.",
    category: "Dev",
    date: "Jun 14, 2026",
    tag: "blog",
  },
  {
    slug: "a-box-is-worth-a-thousand-beds",
    icon: "🐱",
    title: "A Box Is Worth a Thousand Beds",
    description:
      "I spent a small fortune on a plush designer cat bed. He sleeps exclusively in the cardboard box it shipped in. A tender meditation on minimalism and betrayal.",
    content:
      "I spent a small fortune on a plush designer cat bed. He sleeps exclusively in the cardboard box it shipped in. A tender meditation on minimalism and betrayal.\n\nThe bed cost more than my first car. It's orthopedic memory foam wrapped in organic cotton with a washable faux-fur liner. It was recommended by a veterinary sleep specialist (those exist, apparently). It arrived in a plain brown cardboard box.\n\nHe was in the box before I'd finished cutting the tape. He has not left the box since. The bed sits empty in the corner, a monument to human hubris and targeted Instagram advertising.\n\nI've tried placing the bed inside the box. He moved to a different box. I've tried removing all boxes from the house. He found a shoebox I didn't know existed and compressed himself into it like a furry liquid.\n\nThe lesson, I think, is about the gap between what we think others need and what they actually want. Or maybe cats are just idiots. Both readings are valid.",
    category: "Lifestyle",
    date: "Jun 07, 2026",
    tag: "blog",
  },
  {
    slug: "the-great-cucumber-incident",
    icon: "🙀",
    title: "The Great Cucumber Incident",
    description:
      "No cucumbers were harmed, but my ego and the living room lamp did not survive the encounter. Hard lessons in trust, snacks, and deeply startled vertical leaps.",
    content:
      "No cucumbers were harmed, but my ego and the living room lamp did not survive the encounter. Hard lessons in trust, snacks, and deeply startled vertical leaps.\n\nI want to be very clear: I did not intentionally place a cucumber behind my cat. I was making a salad. The cucumber rolled off the counter. He turned around and discovered it.\n\nWhat followed was approximately 0.3 seconds of pure, vertical terror. He achieved a height I did not think possible for a creature with no visible leg muscles. The lamp was collateral damage. My dignity was a direct casualty.\n\nThe sound he made — I've consulted linguists and they cannot classify it. It was somewhere between a bark, a scream, and a dial-up modem connecting. The neighbours asked if everything was okay. I said yes. Everything was not okay.\n\nHe did not speak to me for three days. The cucumber remained on the floor as a crime scene marker. I have not made salad since.",
    category: "Drama",
    date: "May 30, 2026",
    tag: "blog",
  },
  {
    slug: "purr-formance-optimization",
    icon: "😻",
    title: "Purr-formance Optimization",
    description:
      "How I cut his response time to the treat bag from four seconds to two hundred milliseconds. Spoiler: the trick is sound design, not love, and definitely not respect.",
    content:
      "How I cut his response time to the treat bag from four seconds to two hundred milliseconds. Spoiler: the trick is sound design, not love, and definitely not respect.\n\nI approached this like any good engineer: with metrics, a hypothesis, and a complete disregard for the emotional complexity of another living being.\n\nBaseline measurement: calling his name yielded a response time of infinity (he does not come when called). The sound of the treat bag, however, produced a measurable reaction — approximately four seconds from crinkle to arrival.\n\nMy optimization strategy was threefold:\n\n1. Eliminate unnecessary latency (moved treats closer to common resting spots)\n2. Improve signal clarity (switched from a quiet bag to one that crinkles at 80dB)\n3. Reduce context-switching overhead (only shake the bag when he's in light sleep, not deep sleep)\n\nResults: 200ms response time. He now arrives before the bag is fully open. The trade-off is that any plastic bag sound — grocery bags, bin liners, bubble wrap — triggers the same response. I cannot unpack shopping without being aggressively supervised.",
    category: "Tuning",
    date: "May 23, 2026",
    tag: "blog",
  },
  {
    slug: "dattoo",
    icon: "🖋️",
    title: "DATTOO",
    description:
      "An app for tattoo artists to manage their clients and appointments.",
    content:
      "DATTOO is a scheduling and client management platform purpose-built for tattoo artists. It handles booking, deposits, consent forms, reference image uploads, and session notes — all in one place.\n\nThe idea came from watching artists juggle DMs, spreadsheets, and paper forms. DATTOO replaces that chaos with a clean mobile-first interface that lets artists focus on their craft.",
    category: "Product",
    date: "Jul 01, 2026",
    tag: "project",
  },
];

export function getPostsByTag(tag: Post["tag"]): Post[] {
  return POSTS.filter((p) => p.tag === tag);
}
