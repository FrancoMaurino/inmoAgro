# Inmobiliaria - Demo local (Next.js + TypeScript + Tailwind)

Proyecto minimal pensado para **probar en local**. Incluye:
- Lista de propiedades
- Ficha de propiedad
- Admin local para crear propiedades (guarda en `data/properties.json`)
- API: `GET /api/properties` y `POST /api/properties` (requiere token admin)

## Requisitos
- Node.js 18+ recomendado
- npm

## Instalación local
1. `npm install`
2. Crear archivo `.env.local` en la raíz con:
```
ADMIN_TOKEN=changeme
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
Usá el mismo valor en la pantalla Admin como "token" para poder crear propiedades.

3. `npm run dev`
4. Abrir `http://localhost:3000`

## Notas importantes
- El método de guardar propiedades usa escritura a disco en `data/properties.json`. Funciona bien en desarrollo local pero **no** es una solución para producción en Vercel (serverless) ni para múltiples instancias. Para producción recomiendo migrar a Supabase o una base de datos real y Storage para imágenes. Puedo ayudarte a conectar Supabase cuando quieras.
- Para el deploy final (Vercel + Supabase) te dejo la estructura y endpoints listos para reemplazar la implementación de lectura/escritura.

## Archivos clave
- `app/` - App Router pages
- `app/api/properties/route.ts` - API read/write local
- `data/properties.json` - datos de ejemplo (se actualiza al crear propiedades)

