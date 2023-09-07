import ShortFooter from "app/components/Shared/shortFooter.jsx";

export default function RootLayout({ children }) {
  return (
    <>
      {children}

      <ShortFooter />
    </>
  );
}