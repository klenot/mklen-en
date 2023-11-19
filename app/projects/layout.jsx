import ShortFooter from "app/components/Shared/footer-short.jsx";

export default function ProjectsLayout({ children }) {
  return (
    <>
      {children}

      <ShortFooter />
    </>
  );
}
