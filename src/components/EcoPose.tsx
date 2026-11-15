import { useEffect, useRef, useState } from 'react';
import { tocarAcorde } from '../lib/sonido';

export const POSES = ['pillo', 'critico', 'desconfiado', 'sudando', 'avergonzado', 'horror', 'miedo', 'indignado'] as const;
export type Pose = (typeof POSES)[number];

/** Las ocho poses apiladas y cruzadas por opacidad: el cambio de cara es instantáneo. `grande` usa los originales (portada). Decorativo. */
export function EcoPose({ pose, className = '', grande = false }: { pose: Pose; className?: string; grande?: boolean }) {
  return (
    <span aria-hidden className={`relative block ${className}`}>
      {POSES.map((p) => (
        <img
          key={p} src={grande ? `/eco/${p}.webp` : `/eco/s/${p}.webp`} alt="" draggable={false} fetchPriority={grande && p !== 'pillo' ? 'low' : undefined}
          className={`absolute inset-0 size-full select-none object-contain object-bottom transition-opacity duration-200 ${p === pose ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </span>
  );
}

const CICLO: Pose[] = ['pillo', 'critico', 'desconfiado', 'horror', 'indignado', 'sudando', 'miedo', 'avergonzado'];
const AL_TOCAR: Pose[] = ['horror', 'pillo', 'indignado', 'miedo', 'pillo'];

/** Eco a cuerpo entero en la portada: recorre sus caras solo y reacciona si lo tocas o si suena el aplauso. */
export function EcoHeroe({ etiqueta }: { etiqueta: string }) {
  const [i, setI] = useState(0);
  const [toque, setToque] = useState<{ pose: Pose; n: number } | null>(null);
  const vez = useRef(0);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % CICLO.length), 2800);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const alCelebrar = () => setToque((t) => ({ pose: 'pillo', n: (t?.n ?? 0) + 1 }));
    addEventListener('publico:celebra', alCelebrar);
    return () => removeEventListener('publico:celebra', alCelebrar);
  }, []);
  useEffect(() => {
    if (!toque) return;
    const id = setTimeout(() => setToque(null), 2200);
    return () => clearTimeout(id);
  }, [toque]);

  const pose = toque?.pose ?? CICLO[i];
  return (
    <button
      type="button" aria-label={etiqueta}
      onClick={() => { tocarAcorde(); setToque({ pose: AL_TOCAR[vez.current++ % AL_TOCAR.length], n: vez.current }); }}
      className="eco-cuerpo relative mx-auto block h-60 w-64 cursor-pointer sm:h-80 sm:w-80 lg:h-96 lg:w-96"
    >
      <span aria-hidden className="absolute bottom-2 left-1/2 aspect-square w-[82%] -translate-x-1/2 rounded-full bg-acc-soft" />
      <span key={`${pose}-${toque?.n ?? ''}`} className="eco-bote absolute inset-0 block"><EcoPose pose={pose} className="size-full" grande /></span>
    </button>
  );
}
