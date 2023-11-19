import Footer from "app/components/Shared/footer-long.jsx";

export default function AboutLayout({ children }) {
  return (
    <>
      <main>
        {children}

        <Footer />
      </main>
    </>
  );
}
