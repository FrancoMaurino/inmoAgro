import PropertiesGrid from './PropertiesGrid'
import { Property } from '../types/property'

type Props = {
  properties: Property[]
}

export default function FeaturedProperties({ properties }: Props) {
  if (properties.length === 0) return null

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-6">
        Propiedades destacadas
      </h2>

      <PropertiesGrid properties={properties} />
    </section>
  )
}
