const NAV_ITEMS = [
  { label: "home", href: "#hero" },
  { label: "services", href: "#services" },
  { label: "experience", href: "#experiences" },
  { label: "projects", href: "#projects" },
  { label: "blog", href: "#blog" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav
      id="navbar"
      className="flex justify-between items-center bg-white py-2 px-12"
    >
      {NAV_ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="font-mono text-xs font-medium text-black w-fit"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
