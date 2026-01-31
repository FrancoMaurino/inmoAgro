import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/header'
import Footer from './components/footer'
import WhatsAppButton from './components/WhatsAppButton'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Inmobiliaria',
  description: 'Compra, venta y alquiler de propiedades',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>

      <body className="bg-gray-50 text-gray-800">
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
