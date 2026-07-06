import { NAV_ITEMS } from "@/components/layout/navItems";
import WaveNavLink from "@/components/layout/WaveNavLink";
import ViewToggle from "@/components/layout/ViewToggle";

export default function Navbar() {
  return (
    <nav
      id="navbar"
      className="flex flex-col items-center bg-white py-2 px-12 max-w-3xl"
    >
      <div className="mb-1 absolute right-2 top-2">
        <ViewToggle />
      </div>
      <div className="flex justify-between items-center w-full">
        {NAV_ITEMS.map((item) => (
          <WaveNavLink key={item.label} item={item} />
        ))}
      </div>
    </nav>
  );
}
