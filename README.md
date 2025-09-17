# tldraw

Pizarra colaborativa online construida con Next.js, tldraw y TRPC.

---

## Estructura básica del proyecto

- `src/` — Código fuente principal
- `db.json` — Mock de datos para desarrollo
- `package.json` — Scripts y dependencias
- `README.md` — Documentación

## Instalación y comandos principales

1. Instala dependencias:
   ```bash
   pnpm install
   ```

2. Levanta la app en modo desarrollo:
   ```bash
   pnpm dev
   ```
   - Next.js: http://localhost:3000
   - json-server (mock): http://localhost:3001

3. Build y producción:
   ```bash
   pnpm build && pnpm start
   ```

## Scripts útiles
- `pnpm dev` — desarrollo (Next.js + json-server)
- `pnpm build` — compila la app
- `pnpm start` — inicia Next.js en producción

## Cosas a tener en cuenta
- El mock de datos (`json-server`) se usa solo en desarrollo.
- El proyecto usa App Router de Next.js.
- El Error Boundary global está en `src/app/error.tsx`.
- El toast de notificación está implementado con contexto y portal en `src/components/ui/shadcn-io/toast.tsx`.
- Los estilos principales están en `src/app/globals.css` y se usa Tailwind.
- Puedes personalizar la configuración en `next.config.ts` y `postcss.config.mjs`.
- El usuario por defecto es `user_123` (puedes cambiarlo en el contexto TRPC).

---

## Flujos de la app y uso de TRPC

### Home
- Al entrar en la página principal (`src/scenes/Home/Home.tsx`), se llama a `trpc.getDocuments()` para obtener la lista de documentos y mostrarlos en tarjetas.

### Abrir un documento
- Al navegar a `/document/[id]`, se renderiza `DocumentWithId` (`src/scenes/DocumentWithId/DocumentWithId.tsx`).
- Dentro de `TldrawPanelWrapper`, se usa el hook `useHydrateDocumentWithId` para llamar a:
  - `trpc.getDocument.useQuery({ id })` para obtener el documento.
  - `trpc.getSession.useQuery({ documentId: id, userId })` para obtener la sesión del usuario.

### Edición y guardado automático
- En el editor (`TldrawPanel` y `ListenerInitializer`), cada vez que el usuario edita el documento:
  - Se escucha el store del editor (`useListener`).
  - Se llama a `trpc.saveDocument.useMutation()` para guardar el documento.
  - Se llama a `trpc.saveSession.useMutation()` para guardar la sesión del usuario.

### Estructura de los endpoints principales
- `getDocuments`: Listar todos los documentos.
- `getDocument`: Obtener un documento por ID.
- `getSession`: Obtener la sesión de un usuario en un documento.
- `saveDocument`: Guardar el estado de un documento.
- `saveSession`: Guardar el estado de la sesión de usuario.

### Notas
- Todos los endpoints se consumen mediante hooks de React Query generados por TRPC.
- El guardado es automático y reactivo: cada cambio en el editor dispara el guardado.

---
