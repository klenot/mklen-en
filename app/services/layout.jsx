import ShortFooter from "app/components/Shared/shortFooter.jsx";

export default function ServicesLayout({ children }) {
  return (
    <>
      {children}

      <ShortFooter />
    </>
  );
}