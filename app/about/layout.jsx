import Footer from "app/components/Shared/footer.jsx";

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
