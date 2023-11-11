import ShortNavBar from "app/components/Shared/shortNavBar.jsx"
import BlogFooter from "app/components/Blog/blogFooter.jsx";

export default function PostLayout({ children }) {
  return (
    <>
      <ShortNavBar/>
      {children}
      <BlogFooter />
    </>
  );
}