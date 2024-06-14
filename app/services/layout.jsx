import ShortFooter from "app/components/Shared/footer-short.jsx";

export default function ServicesLayout({ children }) {
  return (
    <>
        {children}
        <ShortFooter />
    </>
  );
}
