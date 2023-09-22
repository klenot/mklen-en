import ShortFooter from "app/components/Shared/shortFooter.jsx";

export default function ProjectsLayout({ children }) {
  return (
    <>
      {children}

      <ShortFooter />
    </>
  );
}
