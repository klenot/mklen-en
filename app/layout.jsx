import 'styles/globals.css'
import Head from "app/components/Shared/head.jsx"
import NavBar from "app/components/Shared/navBar.jsx"
import Providers from "app/providers.jsx"
import Footer from "app/components/Shared/footer.jsx"

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
