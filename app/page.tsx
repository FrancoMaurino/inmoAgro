import Link from 'next/link'
import Hero from './components/Hero'
import FeaturedProperties from './components/FeaturedProperties'
import CallToAction from './components/CallToAction'
import properties from '../data/properties.json'

export default function Home() {

  
const destacadas = properties.filter(p => p.destacada)
  return (
    
    <main>      
      <section
        className="relative h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Propiedades que acompañan tu próximo paso
          </h1>

          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Compra, venta y alquiler con asesoramiento profesional
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/propiedades"
              className="bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition"
            >
              Ver propiedades
            </Link>

            <a
              href="https://wa.me/549XXXXXXXXXX"
              target="_blank"
              className="border border-white px-6 py-3 rounded-md hover:bg-white hover:text-gray-900 transition"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>
      <FeaturedProperties properties={destacadas} />

      <CallToAction />
    </main>
  )
}
