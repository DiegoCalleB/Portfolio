import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/** En local, sirve /api/eco con la misma función que usa Vercel (lee GEMINI_API_KEY del entorno). */
const apiLocal = (): Plugin => ({
  name: 'api-local',
  configureServer(server) {
    server.middlewares.use('/api/eco', async (req, res) => {
      const chunks: Buffer[] = [];
      for await (const c of req) chunks.push(c as Buffer);
      const { POST } = await server.ssrLoadModule('/api/eco.ts');
      const r: Response = await POST(new Request('http://local/api/eco', { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': req.socket.remoteAddress ?? '' }, body: Buffer.concat(chunks) }));
      res.statusCode = r.status; res.setHeader('content-type', 'application/json'); res.end(await r.text());
    });
  },
});

export default defineConfig({ plugins: [react(), tailwindcss(), apiLocal()] });
