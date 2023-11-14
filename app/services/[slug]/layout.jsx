import NavBar from "app/components/Shared/navBar.jsx"

export default function ServiceLayout({ children }) {
  return (
    <>
      <NavBar/>
      {children}
    </>
  );
}