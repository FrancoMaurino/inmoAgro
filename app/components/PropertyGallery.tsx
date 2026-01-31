'use client'

import { useState } from 'react'

type Props = {
  images: string[]
  title?: string
}

export default function PropertyGallery({ images, title }: Props) {
  const [active, setActive] = useState(0)

  if (!images || images.length === 0) return null

  return (
    <div className="w-full">
      {/* Imagen principal */}
      <div className="w-full aspect-[16/9] mb-3 overflow-hidden rounded-lg border">
        <img
          src={images[active]}
          alt={title || 'Propiedad'}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-20 w-28 flex-shrink-0 rounded border overflow-hidden
                ${i === active ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'}
              `}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
