import { useState } from 'react';
import { trayectoria, type Lang } from '../data/perfil';
import { useEnVista } from './Revelar';
import { alturaBarra } from '../lib/carrera';

const ANOS = Array.from({ length: 20 }, (_, i) => 2007 + i);
const etapaDe = (a: number) => (a >= 2026 ? 0 : a >= 2013 ? 1 : a >= 2009 ? 2 : 3);
const HITOS = new Set([2007, 2009, 2013, 2026]);

/** La carrera como una Onda: una barra por año, cada vez más alta (crescendo: la altura crece en todos los años, no por etapas). Se toca o se recorre con el teclado. */
export function CarreraOnda({ lang, pista }: { lang: Lang; pista: string }) {
  const [sel, setSel] = useState(0);
  const [ref, dentro] = useEnVista<HTMLDivElement>(0.3);
  const e = trayectoria[sel];
  return (
    <div ref={ref} className="mb-6 rounded-l bg-surface p-5 sm:p-7">
      <div className="mb-8 flex h-36 items-end gap-1 sm:h-44 sm:gap-1.5" role="group" aria-label={pista}>
        {ANOS.map((a, i) => {
          const k = etapaDe(a);
          return (
            <button
              key={a} type="button" aria-pressed={k === sel} aria-label={`${a} · ${trayectoria[k].cargo[lang]}`}
              onMouseEnter={() => setSel(k)} onFocus={() => setSel(k)} onClick={() => setSel(k)}
              className="relative flex h-full flex-1 items-end justify-center"
            >
              <span
                className="block w-full max-w-4 rounded-pill"
                style={{
                  height: dentro ? `${alturaBarra(i, ANOS.length)}%` : '8%', background: `var(--mod-${k + 1})`, opacity: k === sel ? 1 : 0.32,
                  transition: `height 700ms cubic-bezier(.3,1.4,.5,1) ${dentro ? i * 35 : 0}ms, opacity 200ms`,
                }}
              />
              {HITOS.has(a) && <span aria-hidden className="absolute -bottom-6 text-[11px] text-ink-3 tnum">{a}</span>}
            </button>
          );
        })}
      </div>
      <div aria-live="polite" className="flex flex-col gap-1">
        <p className="flex items-center gap-2 text-sm text-ink-3 tnum">
          <span aria-hidden className="size-2.5 rounded-pill" style={{ background: `var(--mod-${sel + 1})` }} />
          {e.periodo[lang]} · {e.empresa}
        </p>
        <p className="text-lg font-semibold tracking-tight">{e.cargo[lang]}</p>
        <p className="max-w-3xl text-[15px] leading-relaxed text-ink-2">{e.puntos[0][lang]}</p>
      </div>
    </div>
  );
}
