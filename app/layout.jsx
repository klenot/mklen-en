import 'styles/globals.css'
import Head from "components/head.jsx"
import NavBar from "components/navBar.jsx"
import Providers from "app/providers.jsx"
import Footer from "components/footer.jsx"

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark-theme">
      
      <Head />
      
      <Providers>

        <body>
          
          <NavBar />

          {children}
            
          <Footer />
            
        </body>
      
      </Providers >
    
    </html>
  )
}
