import Link from 'next/link'
import { Property } from '../types/property'

export default function PropertyCard({ propiedad }: { propiedad: Property }) {
  return (
    <Link href={`/propiedades/${propiedad.id}`} className="group">
      <div
        className="
          bg-white rounded-2xl overflow-hidden
          shadow-sm hover:shadow-xl
          transition-all duration-300
          cursor-pointer
        "
      >
        {/* Imagen */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={propiedad.imagen}
            alt={propiedad.titulo}
            className="
              h-full w-full object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />

          {propiedad.destacada && (
            <span className="
              absolute top-4 left-4
              bg-yellow-400 text-yellow-900
              text-xs font-semibold
              px-3 py-1 rounded-full
              shadow
            ">
              Destacada
            </span>
          )}
        </div>

        {/* Contenido */}
        <div className="p-5 space-y-2">
          <h3 className="text-lg font-semibold leading-tight">
            {propiedad.titulo}
          </h3>

          <p className="text-sm text-gray-500">
            {propiedad.ubicacion}
          </p>

          <div className="pt-2 flex items-center justify-between">
            <p className="text-xl font-bold text-gray-900">
              USD {propiedad.precio.toLocaleString()}
            </p>

            {propiedad.hectareas > 0 && (
              <span className="
                text-sm text-gray-600
                bg-gray-100
                px-3 py-1 rounded-full
              ">
                {propiedad.hectareas} ha
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
