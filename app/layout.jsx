import "styles/globals.css";
import Head from "app/components/Shared/head.jsx";
import NavBar from "app/components/Shared/navBar.jsx";
import Providers from "app/providers.jsx";

export const metadata = {
  title: {
    default: "I'll shape your digital marketing | Marek Klenotič",
    template: "%s | Marek Klenotič",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='dark' suppressHydrationWarning={true}>
      <Head />
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
