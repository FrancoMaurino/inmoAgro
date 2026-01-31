import { Property } from '../types/property'

export type PropertyFilters = {
  operacion?: string
  tipo?: string
  precioMin?: number
  precioMax?: number
  keyword?: string

  hectareasMin?: number
  hectareasMax?: number
}


export function filterProperties(
  properties: Property[],
  filters: PropertyFilters
) {
  return properties.filter(p => {
    if (filters.operacion && p.operacion !== filters.operacion) return false
    if (filters.tipo && p.tipo !== filters.tipo) return false

    if (filters.precioMin && p.precio < filters.precioMin) return false
    if (filters.precioMax && p.precio > filters.precioMax) return false

    if (filters.keyword) {
      const text = filters.keyword.toLowerCase()
      const searchable = `
        ${p.titulo}
        ${p.ubicacion}
        ${p.descripcion}
      `.toLowerCase()

      if (!searchable.includes(text)) return false
    }
    if (
      filters.hectareasMin !== undefined &&
      p.hectareas < filters.hectareasMin
    )
      return false

    if (
      filters.hectareasMax !== undefined &&
      p.hectareas > filters.hectareasMax
    )
      return false

    return true
  })
}
