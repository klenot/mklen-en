import ShortFooter from "app/components/Shared/shortFooter.jsx";

export default function ServicesLayout({ children }) {
  return (
    <>
      <main>
        {children}
        <ShortFooter />
      </main>
    </>
  );
}
