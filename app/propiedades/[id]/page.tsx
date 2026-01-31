'use client'

import { useMemo } from 'react'
import propiedades from '../../../data/properties.json'
import { Property } from '../../types/property'
import PropertyMap from 'app/components/PropertyMap'
import PropertyGallery from 'app/components/PropertyGallery'

export default function Detalle({ params }: { params: { id: string } }) {
  const propiedad = (propiedades as Property[]).find(
    (p) => p.id === params.id
  )

  if (!propiedad) {
    return <p className="p-6">Propiedad no encontrada</p>
  }

  // Precio por ha (seguro contra divisiones por 0)
  const precioPorHa = propiedad.hectareas && propiedad.hectareas > 0
    ? propiedad.precio / propiedad.hectareas
    : null

  // Aseguramos que la imagen portada sea la primera
  const imagesOrdered = useMemo(() => {
    if (!propiedad.imagenes || propiedad.imagenes.length === 0) {
      return propiedad.imagen ? [propiedad.imagen] : []
    }
    if (!propiedad.imagen) return propiedad.imagenes
    return [
      propiedad.imagen,
      ...propiedad.imagenes.filter((img) => img !== propiedad.imagen),
    ]
  }, [propiedad])

  // utilidades UI
  const formattedPrice = `USD ${Number(propiedad.precio).toLocaleString('es-AR')}`
  const formattedPerHa = precioPorHa
    ? `USD ${Number(precioPorHa).toLocaleString('es-AR', { maximumFractionDigits: 0 })} / ha`
    : null

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('Enlace copiado al portapapeles')
    } catch {
      alert('No se pudo copiar el enlace')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const openWhatsApp = () => {
    const phone = '5492617627270'
    const message = encodeURIComponent(`Hola, quisiera consultar por: ${propiedad.titulo} (${shareUrl})`)
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumb / meta */}
      <div className="text-sm text-gray-500 mb-4">
        <a href="/" className="hover:underline">Inicio</a>
        <span className="mx-2">/</span>
        <a href="/propiedades" className="hover:underline">Propiedades</a>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{propiedad.titulo}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Gallery + main content (col-span-2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title + meta row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold leading-tight">
                {propiedad.titulo}
              </h1>

              <p className="mt-2 text-sm text-gray-600 flex items-center gap-3">
                {/* location icon */}
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="9" r="2.2" fill="currentColor"/>
                </svg>
                {propiedad.ubicacion}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {propiedad.destacada && (
                <span className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                  {/* star */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 17.3l-6.2 3.7 1.6-7.1L2 9.6l7.2-.6L12 2l2.8 7 7.2.6-5.4 4.3 1.6 7.1z" fill="currentColor"/>
                  </svg>
                  Destacada
                </span>
              )}

              {/* small action icons */}
              <button
                onClick={handleCopyLink}
                aria-label="Copiar enlace"
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Copiar enlace"
              >
                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none">
                  <path d="M15 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>

              <button
                onClick={handlePrint}
                aria-label="Imprimir"
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Imprimir"
              >
                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9V2h12v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="6" y="13" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <PropertyGallery images={imagesOrdered} title={propiedad.titulo} />
          </div>

          {/* Price + quick facts */}
          <div className="bg-white border rounded-xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-extrabold text-gray-900">{formattedPrice}</div>
                {formattedPerHa && (
                  <div className="text-sm text-gray-600 mt-1">{formattedPerHa}</div>
                )}
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-500">ID</div>
                <div className="font-mono text-sm text-gray-700">{propiedad.id}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                {/* icon hectareas */}
                <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none"><path d="M3 3h18v7H3z" stroke="currentColor" strokeWidth="1.2"/><path d="M3 14h7v7H3z" stroke="currentColor" strokeWidth="1.2"/></svg>
                <div>
                  <div className="text-xs text-gray-500">Superficie</div>
                  <div className="font-medium">{propiedad.hectareas} ha</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* icon tipo */}
                <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none"><path d="M12 2l8 6v10a2 2 0 0 1-2 2h-4v-6H10v6H6a2 2 0 0 1-2-2V8l8-6z" stroke="currentColor" strokeWidth="1.2"/></svg>
                <div>
                  <div className="text-xs text-gray-500">Tipo</div>
                  <div className="font-medium capitalize">{propiedad.tipo}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* icon operacion */}
                <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none"><path d="M12 3v18" stroke="currentColor" strokeWidth="1.2"/><path d="M3 12h18" stroke="currentColor" strokeWidth="1.2"/></svg>
                <div>
                  <div className="text-xs text-gray-500">Operación</div>
                  <div className="font-medium capitalize">{propiedad.operacion}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* icon ubicacion small */}
                <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" stroke="currentColor" strokeWidth="1.2"/><circle cx="12" cy="9" r="2.2" fill="currentColor"/></svg>
                <div>
                  <div className="text-xs text-gray-500">Ubicación</div>
                  <div className="font-medium">{propiedad.ubicacion}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Descripción</h2>
            <p className="text-gray-700 leading-relaxed">{propiedad.descripcion}</p>
          </div>
        </div>

        {/* Right: Sticky contact / details */}
        <aside className="space-y-6">
          <div className="sticky top-6 bg-white border rounded-xl p-5 shadow-sm w-full">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-700">
                {/* seller init */}
                A
              </div>
              <div>
                <div className="text-sm text-gray-500">Contactar</div>
                <div className="font-medium">Inmobiliaria</div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <button
                onClick={openWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
              >
                {/* whatsapp icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M16.7 7.3a5 5 0 00-9.2 3.2c0 1.9.9 3.5 2.2 4.7L9 18l2.1-.9a7.1 7.1 0 004.5.9 7 7 0 00.1-12.8z" fill="currentColor"/></svg>
                Contactar por WhatsApp
              </button>

              <a
                href={`mailto:info@inmobiliaria.com?subject=Consulta%20por%20${encodeURIComponent(propiedad.titulo)}`}
                className="w-full inline-flex items-center justify-center gap-2 border border-gray-200 px-4 py-2 rounded-md text-sm hover:bg-gray-50"
              >
                {/* mail icon */}
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none"><path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.2"/></svg>
                Enviar email
              </a>

              <button
                onClick={handleCopyLink}
                className="w-full inline-flex items-center justify-center gap-2 border border-gray-200 px-4 py-2 rounded-md text-sm hover:bg-gray-50"
              >
                {/* link icon */}
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none"><path d="M10 14a5 5 0 017.1 0l1.4 1.4" stroke="currentColor" strokeWidth="1.4"/><path d="M14 10a5 5 0 00-7.1 0L5.5 11.4" stroke="currentColor" strokeWidth="1.4"/></svg>
                Copiar enlace
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Publicado: <span className="text-gray-700">Hace 12 días</span>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-4 text-sm text-gray-700">
            <div className="font-medium mb-2">Datos rápidos</div>
            <ul className="space-y-2">
              <li><strong>Operación:</strong> {propiedad.operacion}</li>
              <li><strong>Tipo:</strong> {propiedad.tipo}</li>
              <li><strong>Superficie:</strong> {propiedad.hectareas} ha</li>
              <li><strong>Ubicación:</strong> {propiedad.ubicacion}</li>
              <li><strong>ID:</strong> {propiedad.id}</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* MAPA */}
      <div className="mt-10">
        <h2 className="text-lg font-medium mb-3">Ubicación en el mapa</h2>
        <PropertyMap lat={propiedad.lat} lng={propiedad.lng} title={propiedad.titulo} />
      </div>
    </main>
  )
}
