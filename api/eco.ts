import { crearLimitador, instruccionesEco, limpiarConversacion } from '../src/lib/ecoCore.js';

const permitir = crearLimitador();
const MODELO = process.env.ECO_MODEL || 'gemini-2.5-flash';

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });

/** Función de Vercel: POST /api/eco { messages, lang } → { reply } */
export async function POST(request: Request): Promise<Response> {
  const clave = process.env.GEMINI_API_KEY;
  if (!clave) return json(503, { error: 'eco_sin_configurar' });

  const ip = (request.headers.get('x-forwarded-for') || 'anon').split(',')[0].trim();
  if (!permitir(ip)) return json(429, { error: 'demasiadas_preguntas' });

  let body: { messages?: unknown; lang?: unknown };
  try { body = await request.json(); } catch { return json(400, { error: 'json_invalido' }); }
  const lang = body.lang === 'en' ? 'en' : 'es';
  const msgs = limpiarConversacion(body.messages);
  if (!msgs) return json(400, { error: 'conversacion_invalida' });

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': clave },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: instruccionesEco(lang) }] },
      contents: msgs.map((m) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })),
      generationConfig: { temperature: 0.3, maxOutputTokens: 400 },
    }),
    signal: AbortSignal.timeout(20_000),
  }).catch(() => null);

  if (!res?.ok) return json(502, { error: 'eco_no_responde' });
  const data = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
  const reply = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('').trim();
  return reply ? json(200, { reply }) : json(502, { error: 'eco_sin_respuesta' });
}
