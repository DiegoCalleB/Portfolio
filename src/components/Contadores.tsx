import { useEffect, useState } from 'react';
import { contadores, type Lang } from '../data/perfil';
import { useEnVista } from './Revelar';

function Cifra({ valor, activo }: { valor: number; activo: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!activo) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(valor); return; }
    const t0 = performance.now();
    let raf = 0;
    const paso = (t: number) => {
      const p = Math.min((t - t0) / 1300, 1);
      setV(Math.round(valor * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [activo, valor]);
  return <>{v}</>;
}

export function Contadores({ lang }: { lang: Lang }) {
  const [ref, dentro] = useEnVista<HTMLUListElement>(0.4);
  return (
    <ul ref={ref} className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {contadores.map((c, i) => (
        <li key={c.etiqueta.es} aria-label={`${c.valor}${c.mas ? '+' : ''} ${c.etiqueta[lang]}`} className="rounded-l bg-surface p-4 sm:p-5">
          <span aria-hidden className="mb-3 block h-1.5 w-8 rounded-pill" style={{ background: `var(--mod-${(i % 4) + 1})` }} />
          <p aria-hidden className="text-4xl font-semibold tracking-tight sm:text-5xl"><Cifra valor={c.valor} activo={dentro} />{c.mas ? '+' : ''}</p>
          <p aria-hidden className="mt-1 text-sm leading-snug text-ink-2">{c.etiqueta[lang]}</p>
        </li>
      ))}
    </ul>
  );
}
