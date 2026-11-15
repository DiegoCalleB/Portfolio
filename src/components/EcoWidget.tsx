import { useEffect, useState } from 'react';
import type { Lang } from '../data/perfil';
import type { Textos } from '../data/textos';
import { EcoChat } from './EcoChat';
import { EcoPose, type Pose } from './EcoPose';

const POSE_SECCION: Record<string, Pose> = { inicio: 'pillo', promocar: 'critico', proyectos: 'pillo', trayectoria: 'critico', formacion: 'pillo', contacto: 'pillo' };
const SOMBRA = 'shadow-[0_10px_30px_-10px_rgba(16,18,22,.35)]';

/**
 * El chat de Eco como widget clásico: botón flotante abajo a la derecha que abre un panel.
 * Con el panel cerrado, Eco comenta cada sección al pasar y la conversación se conserva.
 */
export function EcoWidget({ abierto, setAbierto, seccion, t, lang }: { abierto: boolean; setAbierto: (a: boolean) => void; seccion: string; t: Textos; lang: Lang }) {
  const [dicho, setDicho] = useState<string | null>(null);
  const [visto, setVisto] = useState(false);
  const [poseChat, setPoseChat] = useState<Pose>('pillo');

  useEffect(() => {
    if (abierto) { setVisto(true); setDicho(null); setTimeout(() => document.getElementById('eco-input')?.focus({ preventScroll: true }), 250); return; }
    const frase = seccion === 'inicio' ? (visto ? undefined : t.guia.hola) : (t.guia.frases as Record<string, string>)[seccion];
    if (!frase) { setDicho(null); return; }
    const a = setTimeout(() => setDicho(frase), seccion === 'inicio' ? 3000 : 400);
    const b = setTimeout(() => setDicho(null), seccion === 'inicio' ? 9000 : 5800);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [seccion, abierto, visto, t.guia]);

  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => { if (e.key === 'Escape') setAbierto(false); };
    addEventListener('keydown', alTeclear);
    return () => removeEventListener('keydown', alTeclear);
  }, [abierto, setAbierto]);

  return (
    <>
      <div
        role="dialog" aria-label="Eco" inert={!abierto}
        className={`fixed bottom-[5.25rem] right-3 z-40 flex h-[min(34rem,calc(100dvh-7.5rem))] w-[min(24rem,calc(100vw-1.5rem))] origin-bottom-right flex-col rounded-l bg-surface transition-all duration-300 sm:bottom-28 sm:right-5 ${SOMBRA} ${abierto ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'}`}
      >
        <div className="flex items-center gap-3 px-4 pb-2 pt-4 sm:px-5">
          <EcoPose pose={poseChat} className="size-11" />
          <div className="mr-auto leading-tight">
            <p className="font-semibold">Eco</p>
            <p className="text-xs text-ink-3">{t.guia.sub}</p>
          </div>
          <button type="button" onClick={() => setAbierto(false)} aria-label={t.guia.cerrar} className="rounded-pill bg-sunken px-3 py-1.5 text-sm text-ink-2 hover:bg-acc-soft hover:text-acc-ink">✕</button>
        </div>
        <EcoChat t={t.eco} lang={lang} onPose={setPoseChat} />
      </div>

      <div className="fixed bottom-3 right-3 z-40 sm:bottom-5 sm:right-5">
        <p aria-hidden className={`absolute bottom-2 right-full mr-3 w-max max-w-[min(15rem,60vw)] rounded-m bg-surface px-3.5 py-2 text-sm leading-snug text-ink transition-all duration-300 ${SOMBRA} ${dicho && !abierto ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-2 opacity-0'}`}>{dicho}</p>
        <button
          type="button" onClick={() => setAbierto(!abierto)} aria-expanded={abierto} aria-label={abierto ? t.guia.cerrar : t.guia.abrir}
          className={`eco-cuerpo relative block size-16 rounded-full bg-acc-soft sm:size-[4.5rem] ${SOMBRA}`}
        >
          {abierto ? (
            <span className="grid size-full place-items-center rounded-full bg-acc-ink text-xl text-surface">✕</span>
          ) : (
            <>
              <span className="absolute -inset-x-1 -bottom-1 -top-4 block"><EcoPose pose={POSE_SECCION[seccion] ?? 'pillo'} className="size-full" /></span>
              {!visto && <span aria-hidden className="absolute right-0 top-0 size-3.5 rounded-full bg-acc-ink" />}
            </>
          )}
        </button>
      </div>
    </>
  );
}
