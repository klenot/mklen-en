import ShortNavBar from "app/components/Shared/nav-bar-short.jsx"
import BlogFooter from "app/components/Blog/blog-footer.jsx";

export default function PostLayout({ children }) {
  return (
    <>
      <ShortNavBar/>
      {children}
      <BlogFooter />
    </>
  );
}