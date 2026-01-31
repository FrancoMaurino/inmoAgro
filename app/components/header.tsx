import Link from 'next/link'

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/"><span className="font-semibold text-lg">InmoAgro</span></Link>
                

                <nav className="flex gap-6 text-sm">
                    <Link href="/">Inicio</Link>
                    <Link href="/propiedades">Propiedades</Link>
                    <Link
                        href="/admin"
                        className="text-sm text-gray-600 hover:text-black"
                    >
                        Admin
                    </Link>
                </nav>
            </div>
        </header>
    )
}
