# GameZone - Backend

API REST construida con Node.js, Express y Supabase, siguiendo la estructura del parcial.

## Instalación local

1. Instalar Node.js.
2. Ejecutar `npm install`.
3. Copiar `.env.example` como `.env` y completar `SUPABASE_URL`, `SUPABASE_KEY` y `PORT`.
4. Ejecutar `npm run dev`.

El servidor inicia en `http://localhost:3000`.

## Rutas

- `POST /api/login` - valida usuario y contraseña contra la tabla `usuarios`.
- `GET /api/juegos` - obtiene todos los videojuegos.
- `POST /api/juegos` - crea un videojuego.
- `PUT /api/juegos/:id` - actualiza un videojuego.
- `DELETE /api/juegos/:id` - elimina un videojuego.

## Publicación en Vercel

Importar este repositorio en Vercel, seleccionar la carpeta `Backend` si se usa un monorepo y configurar las variables `SUPABASE_URL` y `SUPABASE_KEY` en Project Settings > Environment Variables. El archivo `vercel.json` ya está incluido.

No subir nunca el archivo `.env`.
