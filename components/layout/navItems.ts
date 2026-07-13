export type NavItem = { label: string; href: string; desktopOnly?: boolean };

export const NAV_ITEMS: NavItem[] = [
  { label: "services", href: "#services" },
  { label: "experience", href: "#experiences" },
  { label: "projects", href: "#projects" },
  { label: "blog", href: "#blog" },
  { label: "pro bono", href: "#contact", desktopOnly: true },
  { label: "contact", href: "#contact" },
  { label: "linkedin", href: "https://linkedin.com/in/klenoticmarek" },
];
