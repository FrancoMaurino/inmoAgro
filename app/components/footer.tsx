export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 text-sm">
        © {new Date().getFullYear()} InmoAgro · Todos los derechos reservados
      </div>
    </footer>
  )
}
