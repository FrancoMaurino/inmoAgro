export default function Contacto() {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Contacto</h2>
      <p className="text-gray-600 mb-4">Escribinos y te respondemos a la brevedad.</p>
      <form action="#" onSubmit={(e)=>{ e.preventDefault(); alert('Formulario demo: en producción se debe conectar a un backend.') }}>
        <div className="mb-3">
          <label className="block text-sm">Nombre</label>
          <input className="w-full p-2 border rounded"/>
        </div>
        <div className="mb-3">
          <label className="block text-sm">Email</label>
          <input className="w-full p-2 border rounded"/>
        </div>
        <div className="mb-3">
          <label className="block text-sm">Mensaje</label>
          <textarea className="w-full p-2 border rounded" rows={4}></textarea>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Enviar</button>
      </form>
    </div>
  )
}
