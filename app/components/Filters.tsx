'use client'

import { PropertyFilters } from '../lib/filterProperties'

type Props = {
  filters: PropertyFilters
  onChange: (filters: PropertyFilters) => void
}

export default function Filters({ filters, onChange }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 mb-8 space-y-4">
      
      {/* FILA SUPERIOR */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Operación */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">
            Operación
          </label>
          <select
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            value={filters.operacion ?? ''}
            onChange={e =>
              onChange({
                ...filters,
                operacion: e.target.value || undefined,
              })
            }
          >
            <option value="">Todas</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
        </div>

        {/* Tipo */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">
            Tipo de propiedad
          </label>
          <select
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            value={filters.tipo ?? ''}
            onChange={e =>
              onChange({
                ...filters,
                tipo: e.target.value || undefined,
              })
            }
          >
            <option value="">Todas</option>
            <option value="Campo">Campo</option>
            <option value="Finca">Finca</option>
            <option value="Quinta">Quinta</option>
          </select>
        </div>

        {/* Buscar */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-xs font-medium text-gray-500">
            Buscar
          </label>
          <input
            type="text"
            placeholder="Zona, ubicación o palabra clave"
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            value={filters.keyword ?? ''}
            onChange={e =>
              onChange({
                ...filters,
                keyword: e.target.value || undefined,
              })
            }
          />
        </div>
      </div>

      {/* FILA INFERIOR */}
      <div className="grid gap-4 md:grid-cols-2">
        
        {/* Precio */}
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">
            Rango de precio (USD)
          </p>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Mínimo"
              value={filters.precioMin ?? ''}
              onChange={e =>
                onChange({
                  ...filters,
                  precioMin:
                    e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <input
              type="number"
              placeholder="Máximo"
              value={filters.precioMax ?? ''}
              onChange={e =>
                onChange({
                  ...filters,
                  precioMax:
                    e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        {/* Hectáreas */}
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">
            Superficie (hectáreas)
          </p>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Mínimo"
              value={filters.hectareasMin ?? ''}
              onChange={e =>
                onChange({
                  ...filters,
                  hectareasMin:
                    e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <input
              type="number"
              placeholder="Máximo"
              value={filters.hectareasMax ?? ''}
              onChange={e =>
                onChange({
                  ...filters,
                  hectareasMax:
                    e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
  