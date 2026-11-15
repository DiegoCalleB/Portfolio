import { useEffect, useState } from 'react';
import { tocarAcorde } from '../lib/sonido';

export const POSES = ['pillo', 'critico', 'desconfiado', 'sudando', 'avergonzado', 'horror', 'miedo', 'indignado'] as const;
export type Pose = (typeof POSES)[number];

/** Lo que hace Eco si le tocan: sustos y cuernos, por turnos. */
const AL_TOCAR: Pose[] = ['horror', 'pillo', 'indignado', 'miedo', 'pillo'];

/**
 * Eco a cuerpo entero, de pie sobre el chat. Las ocho poses se cargan de una vez y se
 * cruzan por opacidad, así el cambio de cara es instantáneo. Decorativo: el significado va en el chat.
 */
export function EcoCuerpo({ pose, etiqueta }: { pose: Pose; etiqueta: string }) {
  const [toque, setToque] = useState<{ pose: Pose; n: number } | null>(null);
  const [vez, setVez] = useState(0);

  // El aplauso del público también le pone los cuernos
  useEffect(() => {
    const alCelebrar = () => setToque((t) => ({ pose: 'pillo', n: (t?.n ?? 0) + 1 }));
    window.addEventListener('publico:celebra', alCelebrar);
    return () => window.removeEventListener('publico:celebra', alCelebrar);
  }, []);

  useEffect(() => {
    if (!toque) return;
    const id = setTimeout(() => setToque(null), 2200);
    return () => clearTimeout(id);
  }, [toque]);

  const actual = toque?.pose ?? pose;

  return (
    <button
      type="button"
      aria-label={etiqueta}
      onClick={() => { tocarAcorde(); setToque({ pose: AL_TOCAR[vez % AL_TOCAR.length], n: vez }); setVez(vez + 1); }}
      className="eco-cuerpo absolute bottom-[calc(100%-14px)] right-4 h-32 w-36 cursor-pointer sm:right-8 sm:h-40 sm:w-44"
    >
      <span key={`${actual}-${toque?.n ?? ''}`} className="eco-bote absolute inset-0 block">
        {POSES.map((p) => (
          <img
            key={p} src={`/eco/${p}.webp`} alt="" draggable={false}
            className={`absolute inset-0 h-full w-full select-none object-contain object-bottom transition-opacity duration-200 ${p === actual ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </span>
    </button>
  );
}
