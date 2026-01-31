'use client'

import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '300px',
}

export default function PropertyMap({
  lat,
  lng,
  title,
}: {
  lat: number
  lng: number
  title: string
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  if (!isLoaded) {
    return (
      <div className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
        Cargando mapa...
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={16}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      <MarkerF
        position={{ lat, lng }}
        title={title}
        icon={{
          url: '/marker-house.svg',
          scaledSize: new window.google.maps.Size(42, 42),
        }}
      />
    </GoogleMap>
  )
}
