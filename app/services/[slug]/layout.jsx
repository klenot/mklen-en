import NavBar from "app/components/Shared/nav-bar-long.jsx"

export default function ServiceLayout({ children }) {
  return (
    <>
      <NavBar/>
      {children}
    </>
  );
}