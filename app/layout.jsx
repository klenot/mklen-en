import "styles/globals.css";
import "styles/bento.css";
import MainHead from "app/components/Shared/head.jsx";
import Providers from "app/providers.jsx";

export const metadata = {
  title: {
    default: "Marek Klenotic — Digital Growth & Creator Operations",
    template: "%s | Marek Klenotic",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <MainHead />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
