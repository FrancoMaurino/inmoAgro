'use client'

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Formulario enviado')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input className="border p-2 w-full" placeholder="Nombre" />
      <input className="border p-2 w-full" placeholder="Email" />
      <textarea className="border p-2 w-full" placeholder="Mensaje" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Enviar
      </button>
    </form>
  )
}
