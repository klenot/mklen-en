import Footer from "app/components/Shared/footer-long.jsx";

export default function AboutLayout({ children }) {
  return (
    <>
      <main>
        {children}

        <Footer
          props={{
            title: "The goal",
            message1:"I am open to new experiences.",
            message2: "",
          }}
        />
      </main>
    </>
  );
}
