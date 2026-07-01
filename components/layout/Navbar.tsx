import { NAV_ITEMS } from "@/components/layout/navItems";

export default function Navbar() {
  return (
    <nav
      id="navbar"
      className="flex justify-between items-center bg-white py-2 px-12 max-w-3xl"
    >
      {NAV_ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="font-mono text-xs font-medium text-black w-fit px-4"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
