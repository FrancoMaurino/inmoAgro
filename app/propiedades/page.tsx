'use client'

import { useState } from 'react'
import { filterProperties, PropertyFilters } from '../lib/filterProperties'
import Filters from '../components/Filters'
import PropertiesGrid from '../components/PropertiesGrid'
import MapContainer from 'app/components/MapContainer'
import PropertyMap from 'app/components/PropertyMap'
import rawProperties from '../../data/properties.json'
import { Property } from '../types/property'

const properties = rawProperties as Property[]


export default function PropiedadesPage() {
  const [filters, setFilters] = useState<PropertyFilters>({})
  const [orderBy, setOrderBy] = useState('')

  const filtered = filterProperties(properties, filters)

  const ordered = [...filtered].sort((a, b) => {
    switch (orderBy) {
      case 'precio-asc':
        return a.precio - b.precio
      case 'precio-desc':
        return b.precio - a.precio

      case 'ha-asc':
        return a.hectareas - b.hectareas
      case 'ha-desc':
        return b.hectareas - a.hectareas

      case 'usdHa-asc':
        return a.precio / a.hectareas - b.precio / b.hectareas
      case 'usdHa-desc':
        return b.precio / b.hectareas - a.precio / a.hectareas

      default:
        return 0
    }
  })


  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Propiedades</h1>          
      <MapContainer properties={filtered} />
      <Filters filters={filters} onChange={setFilters} />
         <select
        value={orderBy}
        onChange={e => setOrderBy(e.target.value)}
        className="p-2 border rounded mb-4"
      >
        <option value="">Ordenar por</option>
        <option value="precio-asc">Precio menor a mayor</option>
        <option value="precio-desc">Precio mayor a menor</option>
        <option value="ha-asc">Hectáreas menor a mayor</option>
        <option value="ha-desc">Hectáreas mayor a menor</option>
        <option value="usdHa-asc">USD / ha menor a mayor</option>
        <option value="usdHa-desc">USD / ha mayor a menor</option>
      </select>
      <PropertiesGrid properties={ordered} />

    </div>
  )
}
