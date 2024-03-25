import "styles/globals.css";
import MainHead from "app/components/Shared/head.jsx";
import Providers from "app/providers.jsx";
import CookieConsent from "app/components/Shared/cookie-consent.jsx";


export const metadata = {
  title: {
    default: "I'm shaping digital presence | Marek Klenotič",
    template: "%s | Marek Klenotič",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='dark' suppressHydrationWarning={true}>
      <MainHead />
      <body>
        <Providers>
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
