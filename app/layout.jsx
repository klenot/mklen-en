import "styles/globals.css";
import "styles/bento.css";
import MainHead from "app/components/Shared/head.jsx";
import Providers from "app/providers.jsx";
import CookieConsent from "app/components/Shared/cookie-consent.jsx";


export const metadata = {
  title: {
    default: "Single-Page Digital Growth System | Marek Klenotic",
    template: "%s | Marek Klenotic",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
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
