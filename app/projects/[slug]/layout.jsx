import NavBar from "app/components/Shared/nav-bar-long.jsx"

export default function ProjectsLayout({ children }) {
  return (
    <>
      <NavBar/>
      {children}
    </>
  );
}