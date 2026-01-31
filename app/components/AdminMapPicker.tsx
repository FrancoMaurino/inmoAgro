'use client'

import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '300px',
}

const defaultCenter = {
  lat: -32.9019,
  lng: -68.8224,
}

type Props = {
  lat: number | null
  lng: number | null
  onChange: (lat: number, lng: number) => void
}

export default function AdminMapPicker({ lat, lng, onChange }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  if (!isLoaded) {
    return (
      <div className="w-full h-[300px] bg-gray-200 rounded flex items-center justify-center">
        Cargando mapa...
      </div>
    )
  }

  const position = lat && lng ? { lat, lng } : null

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position || defaultCenter}
      zoom={12}
      onClick={(e) => {
        if (!e.latLng) return
        onChange(e.latLng.lat(), e.latLng.lng())
      }}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {position && (
        <MarkerF
          position={position}
          draggable
          onDragEnd={(e) => {
            if (!e.latLng) return
            onChange(e.latLng.lat(), e.latLng.lng())
          }}
        />
      )}
    </GoogleMap>
  )
}
