'use client'

import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import AdminMapPicker from 'app/components/AdminMapPicker'

type Form = {
  titulo: string
  ubicacion: string
  precio: number | ''
  hectareas: number | ''
  imagen: string
  descripcion: string
  operacion: 'venta' | 'alquiler'
  tipo: 'departamento' | 'casa' | 'terreno'
  lat: number | null
  lng: number | null
  imagenes: string[]
  destacada: boolean
}

export default function Admin() {
  const [token, setToken] = useState('')
  const [logged, setLogged] = useState(false)
  const [message, setMessage] = useState('')

  // imágenes
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])

  // ref para llevar el track de objectURLs y poder revokearlas limpiamente
  const previewUrlsRef = useRef<string[]>([])

  const [form, setForm] = useState<Form>({
    titulo: '',
    ubicacion: '',
    precio: '',
    hectareas: '',
    imagen: '',
    descripcion: '',
    operacion: 'venta',
    tipo: 'departamento',
    lat: null,
    lng: null,
    imagenes: [],
    destacada: false,
  })

  useEffect(() => {
    const t = localStorage.getItem('admin_token') || ''
    setToken(t)
    if (t) setLogged(true)
  }, [])

  // limpiar object URLs al desmontar
  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach(u => {
        try { URL.revokeObjectURL(u) } catch (e) {}
      })
      previewUrlsRef.current = []
    }
  }, [])

  const login = () => {
    localStorage.setItem('admin_token', token)
    setLogged(true)
    setMessage('Token guardado. Podés cargar propiedades.')
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setToken('')
    setLogged(false)
    setMessage('Deslogueado.')
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Enviando...')

    if (form.hectareas === '' || Number(form.hectareas) <= 0) {
      setMessage('La superficie en hectáreas es obligatoria')
      return
    }

    if (form.precio === '') {
      setMessage('El precio es obligatorio')
      return
    }

    if (form.lat === null || form.lng === null) {
      setMessage('Seleccioná la ubicación en el mapa')
      return
    }

    // payload listo para enviar. Las imagenes ahora son las previews (blob:...) — > más adelante las reemplazás por URLs reales
    const payload = {
      id: uuidv4(),
      ...form,
      precio: Number(form.precio),
      hectareas: Number(form.hectareas),
    }

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': localStorage.getItem('admin_token') || '',
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setMessage('✅ Propiedad creada correctamente')

        // limpiar previews y files con un pequeño delay para que el usuario vea el mensaje
        setTimeout(() => {
          // revoke objectURLs creadas
          previewUrlsRef.current.forEach(u => {
            try { URL.revokeObjectURL(u) } catch (e) {}
          })
          previewUrlsRef.current = []

          setImagePreviews([])
          setImageFiles([])

          setForm({
            titulo: '',
            ubicacion: '',
            precio: '',
            hectareas: '',
            imagen: '',
            descripcion: '',
            operacion: 'venta',
            tipo: 'departamento',
            lat: null,
            lng: null,
            imagenes: [],
            destacada: false,
          })
        }, 700)

        return
      } else {
        const text = await res.text()
        setMessage('❌ Error al guardar la propiedad: ' + text)
      }
    } catch (err) {
      setMessage('❌ Error al conectar con el servidor')
    }
  }

  // handler al seleccionar archivos
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // generar objectURLs para previews
    const newPreviews = files.map(f => URL.createObjectURL(f))

    // añadimos a los refs para revocar luego
    previewUrlsRef.current = previewUrlsRef.current.concat(newPreviews)

    // actualizar arrays: agregamos al final
    setImageFiles(prev => [...prev, ...files])
    setImagePreviews(prev => [...prev, ...newPreviews])

    // Si no hay portada definida en form.imagen, usar la primera subida
    setForm(prev => ({
      ...prev,
      imagen: prev.imagen || newPreviews[0],
      imagenes: [...(prev.imagenes || []), ...newPreviews],
    }))
  }

  // elegir portada desde las previews
  const setCoverImage = (previewUrl: string) => {
    setForm(prev => ({ ...prev, imagen: previewUrl }))
  }

  // eliminar una preview (y archivo correspondiente)
  const removePreviewAt = (index: number) => {
    setImagePreviews(prev => {
      const next = prev.slice()
      const [removed] = next.splice(index, 1)

      // revoke URL (y sacarlo del ref)
      try {
        URL.revokeObjectURL(removed)
      } catch (e) {}
      previewUrlsRef.current = previewUrlsRef.current.filter(u => u !== removed)

      // si la portada era esa, limpiar portada o poner la siguiente
      setForm(prevForm => {
        const imgs = (prevForm.imagenes || []).slice()
        imgs.splice(index, 1)
        const newPortada = prevForm.imagen === removed ? (imgs[0] || '') : prevForm.imagen
        return { ...prevForm, imagenes: imgs, imagen: newPortada }
      })

      return next
    })

    setImageFiles(prev => {
      const next = prev.slice()
      next.splice(index, 1)
      return next
    })
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">
        Admin – Carga de propiedades
      </h2>

      {!logged ? (
        <div>
          <p className="text-sm text-gray-600 mb-3">
            Ingresá el token admin (se guarda en local)
          </p>

          <div className="flex gap-2">
            <input
              value={token}
              onChange={e => setToken(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Token admin"
            />
            <button
              onClick={login}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Guardar
            </button>
          </div>

          {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-700">Sesión admin activa</div>
            <div className="flex gap-2">
              <button
                onClick={logout}
                className="px-3 py-1 border rounded bg-white"
              >
                Logout
              </button>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-6">

            {/* IDENTIDAD */}
            <section className="space-y-3">
              <h3 className="text-lg font-medium">Información general</h3>

              <input
                value={form.titulo}
                onChange={e => setForm({ ...form, titulo: e.target.value })}
                placeholder="Título (ej: Campo en Lavalle)"
                className="w-full p-2 border rounded"
                required
              />

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.destacada}
                    onChange={e =>
                      setForm({ ...form, destacada: e.target.checked })
                    }
                  />
                  Destacada
                </label>

                <select
                  value={form.tipo}
                  onChange={e =>
                    setForm({ ...form, tipo: e.target.value as Form['tipo'] })
                  }
                  className="p-2 border rounded"
                >
                  <option value="departamento">Departamento</option>
                  <option value="casa">Casa</option>
                  <option value="terreno">Terreno</option>
                </select>

                <select
                  value={form.operacion}
                  onChange={e =>
                    setForm({ ...form, operacion: e.target.value as Form['operacion'] })
                  }
                  className="p-2 border rounded"
                >
                  <option value="venta">Venta</option>
                  <option value="alquiler">Alquiler</option>
                </select>
              </div>
            </section>

            {/* DATOS COMERCIALES */}
            <section className="space-y-3">
              <h3 className="text-lg font-medium">Datos comerciales</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="number"
                  value={form.precio}
                  onChange={e =>
                    setForm({
                      ...form,
                      precio: e.target.value === '' ? '' : Number(e.target.value),
                    })
                  }
                  placeholder="Precio (USD)"
                  className="w-full p-2 border rounded"
                  required
                />

                <input
                  type="number"
                  step="any"
                  value={form.hectareas}
                  onChange={e =>
                    setForm({
                      ...form,
                      hectareas: e.target.value === '' ? '' : Number(e.target.value),
                    })
                  }
                  placeholder="Superficie (ha)"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </section>

            {/* UBICACION */}
            <section className="space-y-3">
              <h3 className="text-lg font-medium">Ubicación</h3>

              <input
                value={form.ubicacion}
                onChange={e => setForm({ ...form, ubicacion: e.target.value })}
                placeholder="Ubicación (ej: Lavalle, Mendoza)"
                className="w-full p-2 border rounded"
              />

              <AdminMapPicker
                lat={form.lat}
                lng={form.lng}
                onChange={(lat, lng) =>
                  setForm(prev => ({ ...prev, lat, lng }))
                }
              />

              {form.lat && form.lng && (
                <p className="text-xs text-gray-500">
                  Lat: {form.lat} | Lng: {form.lng}
                </p>
              )}
            </section>

            {/* IMÁGENES */}
            <section className="space-y-3">
              <h3 className="text-lg font-medium">Imágenes</h3>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFilesChange}
                className="block"
              />

              <p className="text-xs text-gray-500">
                Sube imágenes (puedes seleccionar varias). Luego elegí cuál será la imagen principal (portada) para la card.
              </p>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {imagePreviews.map((src, i) => (
                    <div key={src} className="border rounded overflow-hidden">
                      <img
                        src={src}
                        className="h-28 w-full object-cover"
                        alt={`preview-${i}`}
                      />
                      <div className="p-2 flex justify-between items-center">
                        <button
                          type="button"
                          onClick={() => setCoverImage(src)}
                          className={`text-xs px-2 py-1 rounded ${
                            form.imagen === src ? 'bg-yellow-400' : 'bg-gray-100'
                          }`}
                        >
                          {form.imagen === src ? 'Portada' : 'Usar como portada'}
                        </button>

                        <button
                          type="button"
                          onClick={() => removePreviewAt(i)}
                          className="text-xs text-red-500"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* DESCRIPCION */}
            <section className="space-y-3">
              <h3 className="text-lg font-medium">Descripción</h3>

              <textarea
                value={form.descripcion}
                onChange={e =>
                  setForm({ ...form, descripcion: e.target.value })
                }
                placeholder="Descripción de la propiedad"
                className="w-full p-2 border rounded min-h-[120px]"
              />
            </section>

            {/* BOTON */}
            <div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-medium">
                Crear propiedad
              </button>

              {message && (
                <p className="mt-3 text-sm text-gray-600">{message}</p>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  )
}
