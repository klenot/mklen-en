import { NAV_ITEMS } from "@/components/layout/navItems";
import WaveNavLink from "@/components/layout/WaveNavLink";

export default function Navbar() {
  return (
    <nav
      id="navbar"
      className="flex justify-between items-center bg-white py-2 px-12 max-w-3xl"
    >
      {NAV_ITEMS.map((item) => (
        <WaveNavLink key={item.label} item={item} />
      ))}
    </nav>
  );
}
