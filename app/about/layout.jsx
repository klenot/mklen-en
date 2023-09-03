import Footer from "app/components/Shared/footer.jsx";

export default function RootLayout({ children }) {
  return (
    <>
      {children}

      <Footer />
    </>
  );
}
