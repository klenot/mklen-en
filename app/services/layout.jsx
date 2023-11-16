import ShortFooter from "app/components/Shared/footer-short.jsx";

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
