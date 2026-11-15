import { useEffect, useRef, useState } from 'react';
import { tocarAcorde } from '../lib/sonido';

/** Solo las caras de buen rollo: cuernos de rock y gafas de sol. */
export const POSES = ['pillo', 'critico'] as const;
export type Pose = (typeof POSES)[number];

/** Las poses apiladas y cruzadas por opacidad. `espejo` la voltea; `grande` usa los originales (portada). Decorativo. */
export function EcoPose({ pose, className = '', grande = false, espejo = false }: { pose: Pose; className?: string; grande?: boolean; espejo?: boolean }) {
  return (
    <span aria-hidden className={`relative block ${className}`} style={espejo ? { transform: 'scaleX(-1)' } : undefined}>
      {POSES.map((p) => (
        <img
          key={p} src={grande ? `/eco/${p}.webp` : `/eco/s/${p}.webp`} alt="" draggable={false} fetchPriority={grande && p !== 'pillo' ? 'low' : undefined}
          className={`absolute inset-0 size-full select-none object-contain object-bottom transition-opacity duration-200 ${p === pose ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </span>
  );
}

type Cara = { pose: Pose; espejo: boolean };
const CICLO: Cara[] = [{ pose: 'pillo', espejo: false }, { pose: 'critico', espejo: false }, { pose: 'pillo', espejo: true }, { pose: 'critico', espejo: true }];
const NOTAS = [
  { x: '4%', y: '22%', c: 1, d: 0 }, { x: '90%', y: '30%', c: 3, d: 0.9 }, { x: '10%', y: '64%', c: 2, d: 1.7 },
  { x: '86%', y: '68%', c: 4, d: 2.5 }, { x: '50%', y: '2%', c: 1, d: 3.1 },
];

const Nota = ({ c }: { c: number }) => (
  <svg viewBox="0 0 24 24" className="size-7" style={{ color: `var(--mod-${c})` }} fill="currentColor"><path d="M9 3v12.2A3.5 3.5 0 1 0 11 18V7h6V3H9z" /></svg>
);

type Pieza = { dx: number; dy: number; rot: number; c: number };

/** Eco en la portada: baila al ritmo, cambia de cara y de lado, suelta notas y, si lo tocas, confeti. */
export function EcoHeroe({ etiqueta }: { etiqueta: string }) {
  const [i, setI] = useState(0);
  const [extra, setExtra] = useState<{ cara: Cara; n: number } | null>(null);
  const [confeti, setConfeti] = useState<{ n: number; piezas: Pieza[] } | null>(null);
  const veces = useRef(0);
  const reducido = useRef(matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (reducido.current) return;
    const id = setInterval(() => setI((v) => (v + 1) % CICLO.length), 3000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const alCelebrar = () => setExtra((e) => ({ cara: { pose: 'pillo', espejo: false }, n: (e?.n ?? 0) + 1 }));
    addEventListener('publico:celebra', alCelebrar);
    return () => removeEventListener('publico:celebra', alCelebrar);
  }, []);
  useEffect(() => {
    if (!extra) return;
    const id = setTimeout(() => setExtra(null), 2200);
    return () => clearTimeout(id);
  }, [extra]);
  useEffect(() => {
    if (!confeti) return;
    const id = setTimeout(() => setConfeti(null), 1400);
    return () => clearTimeout(id);
  }, [confeti]);

  function tocar() {
    tocarAcorde();
    veces.current += 1;
    setExtra({ cara: { pose: veces.current % 2 ? 'pillo' : 'critico', espejo: veces.current % 3 === 0 }, n: veces.current });
    if (reducido.current) return;
    setConfeti({
      n: veces.current,
      piezas: Array.from({ length: 18 }, (_, k) => {
        const ang = (k / 18) * Math.PI * 2 + Math.random() * 0.4, fuerza = 110 + Math.random() * 110;
        return { dx: Math.cos(ang) * fuerza, dy: Math.sin(ang) * fuerza - 40, rot: (Math.random() - 0.5) * 540, c: (k % 4) + 1 };
      }),
    });
  }

  const cara = extra?.cara ?? CICLO[i];
  return (
    <button type="button" aria-label={etiqueta} onClick={tocar} className="eco-baile relative mx-auto block h-60 w-64 cursor-pointer sm:h-80 sm:w-80 lg:h-96 lg:w-96">
      <span aria-hidden className="absolute bottom-2 left-1/2 aspect-square w-[82%] -translate-x-1/2 rounded-full bg-acc-soft" />
      {!reducido.current && (
        <span aria-hidden className="pointer-events-none absolute inset-0">
          {NOTAS.map((n, k) => <span key={k} className="nota absolute" style={{ left: n.x, top: n.y, animationDelay: `${n.d}s` }}><Nota c={n.c} /></span>)}
        </span>
      )}
      <span key={`${cara.pose}-${cara.espejo}-${extra?.n ?? ''}`} className="eco-bote absolute inset-0 block"><EcoPose pose={cara.pose} espejo={cara.espejo} className="size-full" grande /></span>
      {confeti && (
        <span key={confeti.n} aria-hidden className="pointer-events-none absolute left-1/2 top-[42%]">
          {confeti.piezas.map((p, k) => (
            <span key={k} className="confeti absolute h-3.5 w-2 rounded-pill" style={{ background: `var(--mod-${p.c})`, ['--dx' as string]: `${p.dx}px`, ['--dy' as string]: `${p.dy}px`, ['--rot' as string]: `${p.rot}deg` }} />
          ))}
        </span>
      )}
    </button>
  );
}
