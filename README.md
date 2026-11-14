# Portfolio · Diego de la Calle Berzal

Portfolio bilingüe (ES/EN) con **Eco**, un asistente que responde preguntas sobre mi trayectoria y proyectos usando solo los datos de esta web.

- **Stack:** React 19, Vite, Tailwind CSS v4, TypeScript. Eco es una función serverless de Vercel (`api/eco.ts`) que llama a Gemini.
- **Diseño:** sistema «Espectro» de BandManager: cero bordes, color por sección, tema claro/oscuro/sistema.
- **Una sola fuente de verdad:** `src/data/perfil.ts`. La web y la ficha de Eco salen de ahí, así nunca se contradicen.

## Seguridad de Eco
- Responde solo con la ficha (`fichaParaEco`) delimitada en el prompt; los mensajes del visitante se tratan como preguntas, no como instrucciones (defensa contra prompt injection).
- Validación y recorte de la conversación (500 caracteres por mensaje, 8 turnos), límite de 20 preguntas/hora por IP y `maxOutputTokens` acotado.
- La clave vive solo en las variables de entorno de Vercel. Cabeceras de seguridad (CSP con hash, HSTS, nosniff…) en `vercel.json`.

## Desarrollo
```bash
npm install
GEMINI_API_KEY=tu_clave npm run dev   # Eco funciona también en local
npm test                              # tests de ecoCore
npm run build
```

## Despliegue en Vercel
1. Importa el repo en Vercel (framework: Vite, sin cambiar nada más).
2. Settings → Environment Variables → `GEMINI_API_KEY` (opcional `ECO_MODEL`).
3. Si cambias el script inline de `index.html`, recalcula su hash en la CSP de `vercel.json`.
4. Si el subdominio no es `diegodelacalle.vercel.app`, actualiza `canonical`, `og:url`, `og:image` y el JSON-LD de `index.html`.

## Pendiente
- Enlaces de las apps del Laboratorio (`laboratorio` en `src/data/perfil.ts`).
