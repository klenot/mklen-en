import "styles/globals.css";
import Head from "app/components/Shared/head.jsx";
import NavBar from "app/components/Shared/navBar.jsx";
import Providers from "app/providers.jsx";

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='dark'>
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
