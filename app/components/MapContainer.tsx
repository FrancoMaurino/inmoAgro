'use client'

import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useLoadScript,
} from '@react-google-maps/api'
import { useState, useRef } from 'react'
import { Property } from '../types/property'

const containerStyle = {
  width: '100%',
  height: '400px',
}

const fallbackCenter = {
  lat: -32.9019,
  lng: -68.8224,
}

export default function MapContainer({ properties }: { properties: Property[] }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  const [hovered, setHovered] = useState<Property | null>(null)
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null)

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
        Cargando mapa...
      </div>
    )
  }

  const validProperties = properties.filter(
    p => typeof p.lat === 'number' && typeof p.lng === 'number'
  )

  const openHover = (p: Property) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    setHovered(p)
  }

  const closeHover = () => {
    hoverTimeout.current = setTimeout(() => {
      setHovered(null)
    }, 150)
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={fallbackCenter}
      zoom={12}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {validProperties.map(p => (
        <MarkerF
          key={p.id}
          position={{ lat: p.lat, lng: p.lng }}
          icon={{
            url: '/marker-house.svg',
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          onMouseOver={() => openHover(p)}
          onMouseOut={closeHover}
        />
      ))}

      {hovered && (
        <InfoWindowF
          position={{ lat: hovered.lat, lng: hovered.lng }}
          options={{ disableAutoPan: true }}
          onCloseClick={() => setHovered(null)}
        >
          <div
            className="w-48"
            onMouseEnter={() => {
              if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
            }}
            onMouseLeave={closeHover}
          >
            <img
              src={hovered.imagen}
              alt={hovered.titulo}
              className="w-full h-24 object-cover rounded mb-2"
            />

            <div className="text-sm font-semibold mb-2">
              ${hovered.precio.toLocaleString()}
            </div>

            <button
              className="w-full bg-blue-600 text-white text-sm py-1 rounded"
              onClick={() =>
                (window.location.href = `/propiedades/${hovered.id}`)
              }
            >
              Ver propiedad
            </button>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  )
}
