import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  const phone = '5492617627270'
  const message = encodeURIComponent(
    'Hola, quiero consultar por una propiedad que vi en la web.'
  )

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6 z-50
        bg-green-500 hover:bg-green-600
        text-white
        rounded-full
        w-16 h-16
        flex items-center justify-center
        hover:shadow-2xl
        active:scale-95
        transition-transform hover:scale-105
        after:content-['']
        after:absolute
        after:inset-0
        after:rounded-full
        after:ring-4
        after:ring-green-500/30
      "
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8" />
    </a>
  )
}
