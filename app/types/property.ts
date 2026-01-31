export type Operacion = 'venta' | 'alquiler'

export type Property = {
  id: string
  titulo: string
  ubicacion: string
  precio: number
  hectareas: number
  imagen: string
  imagenes?: string[]  
  descripcion: string
  operacion: Operacion
  tipo: string
  lat: number
  lng: number
  destacada?: boolean
}
