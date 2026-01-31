export type Property = {
  id: string
  titulo: string
  ubicacion: string
  precio: number
  hectareas: number
  imagen: string
  descripcion: string
  operacion: 'venta' | 'alquiler'
  tipo: 'departamento' | 'casa' | 'terreno'
  lat: number
  lng: number
  destacada?: boolean
}
