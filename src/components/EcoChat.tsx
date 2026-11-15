import { useEffect, useRef, useState } from 'react';
import type { Lang } from '../data/perfil';
import type { Textos } from '../data/textos';
import type { Msg } from '../lib/ecoCore';
import { EcoCuerpo, type Pose } from './EcoCuerpo';

const Avatar = ({ size = 'size-9' }: { size?: string }) => (
  <img src="/eco-avatar.webp" alt="" aria-hidden width={192} height={192} className={`${size} shrink-0 select-none object-contain`} />
);

export function EcoChat({ t, lang }: { t: Textos['eco']; lang: Lang }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [texto, setTexto] = useState('');
  const [cargando, setCargando] = useState(false);
  const [aviso, setAviso] = useState<{ texto: string; tipo: 'limite' | 'error' } | null>(null);
  const lista = useRef<HTMLDivElement>(null);

  useEffect(() => { lista.current?.scrollTo({ top: lista.current.scrollHeight, behavior: 'smooth' }); }, [msgs, cargando]);

  async function preguntar(pregunta: string) {
    const q = pregunta.trim();
    if (!q || cargando) return;
    const nuevos: Msg[] = [...msgs, { role: 'user', text: q }];
    setMsgs(nuevos); setTexto(''); setAviso(null); setCargando(true);
    try {
      const r = await fetch('/api/eco', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: nuevos, lang }) });
      if (r.status === 429) throw new Error('limite');
      const data = (await r.json()) as { reply?: string };
      if (!r.ok || !data.reply) throw new Error('error');
      setMsgs([...nuevos, { role: 'eco', text: data.reply }]);
    } catch (e) {
      const limite = e instanceof Error && e.message === 'limite';
      setAviso({ texto: limite ? t.limite : t.error, tipo: limite ? 'limite' : 'error' });
    } finally {
      setCargando(false);
    }
  }

  const pose: Pose = cargando ? 'desconfiado' : aviso ? (aviso.tipo === 'limite' ? 'avergonzado' : 'sudando') : msgs.length ? 'critico' : 'pillo';

  return (
    <section aria-label="Eco" className="relative mt-28 flex flex-col rounded-l bg-surface p-4 sm:mt-32 sm:p-5 lg:mt-24">
      <EcoCuerpo pose={pose} etiqueta={t.tocar} />
      <div ref={lista} aria-live="polite" className="flex max-h-80 min-h-40 lg:max-h-[26rem] flex-col gap-3 overflow-y-auto pr-1">
        <div className="flex items-start gap-3">
          <Avatar />
          <p className="rounded-m bg-sunken px-4 py-2.5 text-[15px] leading-relaxed">{t.saludo}</p>
        </div>
        {msgs.map((m, i) =>
          m.role === 'user' ? (
            <p key={i} className="ml-12 self-end rounded-m bg-acc-soft px-4 py-2.5 text-[15px] leading-relaxed text-ink">{m.text}</p>
          ) : (
            <div key={i} className="flex items-start gap-3">
              <Avatar />
              <p className="whitespace-pre-line rounded-m bg-sunken px-4 py-2.5 text-[15px] leading-relaxed">{m.text}</p>
            </div>
          ),
        )}
        {cargando && (
          <div className="ml-12 flex items-center gap-3" role="status">
            <div className="onda-viva flex h-6 items-end gap-1" aria-hidden>
              {[60, 100, 75, 90, 50].map((h, i) => <span key={i} className="w-1.5 rounded-pill bg-acc" style={{ height: `${h}%` }} />)}
            </div>
            <span className="text-sm text-ink-2">{t.pensando}</span>
          </div>
        )}
        {aviso && <p className="ml-12 text-sm text-ink-2">{aviso.texto}</p>}
      </div>

      {msgs.length === 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {t.sugerencias.map((s) => (
            <button key={s} onClick={() => preguntar(s)} className="rounded-pill bg-sunken px-3.5 py-1.5 text-sm text-ink-2 transition-colors hover:bg-acc-soft hover:text-acc-ink">
              {s}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); preguntar(texto); }} className="mt-4 flex gap-2">
        <label className="sr-only" htmlFor="eco-input">{t.placeholder}</label>
        <input
          id="eco-input" value={texto} onChange={(e) => setTexto(e.target.value)} maxLength={500}
          placeholder={t.placeholder} autoComplete="off"
          className="min-w-0 flex-1 rounded-pill bg-sunken px-4 py-2.5 text-[15px] text-ink placeholder:text-ink-3 focus:outline-none focus-visible:outline-2 focus-visible:outline-acc"
        />
        <button type="submit" disabled={cargando || !texto.trim()} className="rounded-pill bg-acc-ink px-5 py-2.5 text-[15px] font-semibold text-surface transition-opacity disabled:opacity-40">
          {t.enviar}
        </button>
      </form>
      <p className="mt-3 text-xs text-ink-3">{t.aviso}</p>
    </section>
  );
}
