import ShortFooter from "app/components/Shared/shortFooter.jsx";

export default function BlogLayout({ children }) {
  return (
    <>
      {children}

      <ShortFooter />
    </>
  );
}