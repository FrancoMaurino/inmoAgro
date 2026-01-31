import PropertyCard from './propertyCard'
import { Property } from '../types/property'

export default function PropertiesGrid({ properties }: { properties: Property[] }) {
  if (properties.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500">
        <p className="text-lg font-medium">
          No se encontraron propiedades
        </p>
        <p className="text-sm mt-2">
          Probá ajustando los filtros
        </p>
      </div>
    )
  }

  return (
    <div className="
      grid gap-8
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
    ">
      {properties.map(p => (
        <PropertyCard key={p.id} propiedad={p} />
      ))}
    </div>
  )
}
