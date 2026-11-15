import { useEffect, useState } from 'react';

/** Una fila de público dibujada a mano. Las alturas y posiciones son irregulares a propósito: nadie se coloca en rejilla en un concierto. */
const GENTE = [
  { x: 40, h: 62, s: 1 }, { x: 118, h: 70, s: 1.1 }, { x: 190, h: 58, s: 0.95 }, { x: 262, h: 74, s: 1.15 },
  { x: 345, h: 64, s: 1 }, { x: 420, h: 69, s: 1.05 }, { x: 498, h: 57, s: 0.9 }, { x: 566, h: 72, s: 1.1 },
  { x: 646, h: 63, s: 1 }, { x: 722, h: 68, s: 1.05 }, { x: 800, h: 60, s: 0.95 }, { x: 874, h: 73, s: 1.12 },
  { x: 952, h: 65, s: 1 }, { x: 1030, h: 59, s: 0.92 }, { x: 1104, h: 71, s: 1.08 }, { x: 1178, h: 64, s: 1 },
];

/**
 * El Público de BandManager: aparece por abajo y levanta los brazos cuando el visitante
 * descarga el CV o escribe. Decorativo (aria-hidden); con «reducir movimiento» no se muestra.
 */
export function Publico() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reducido = matchMedia('(prefers-reduced-motion: reduce)');
    const alCelebrar = () => { if (!reducido.matches) setN((v) => v + 1); };
    window.addEventListener('publico:celebra', alCelebrar);
    return () => window.removeEventListener('publico:celebra', alCelebrar);
  }, []);
  if (!n) return null;

  return (
    <div key={n} aria-hidden className="publico pointer-events-none fixed inset-x-0 bottom-0 z-20 h-28 sm:h-36" onAnimationEnd={(e) => { if (e.target === e.currentTarget) setN(0); }}>
      <svg viewBox="0 0 1220 120" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
        {GENTE.map((p, i) => {
          const hombroY = 120 - p.h + 22 * p.s;
          return (
            <g key={i} style={{ animationDelay: `${(i % 5) * 70 + (i % 3) * 40}ms` }} className="persona">
              <circle cx={p.x} cy={120 - p.h} r={11 * p.s} />
              <path d={`M${p.x - 22 * p.s} 122 Q${p.x - 20 * p.s} ${hombroY} ${p.x} ${hombroY - 4} Q${p.x + 20 * p.s} ${hombroY} ${p.x + 22 * p.s} 122 Z`} />
              {[-1, 1].map((lado) => (
                <line
                  key={lado} className="brazo" x1={p.x + lado * 15 * p.s} y1={hombroY + 2} x2={p.x + lado * 26 * p.s} y2={hombroY - 38 * p.s}
                  style={{ transformOrigin: `${p.x + lado * 15 * p.s}px ${hombroY + 2}px`, ['--giro' as string]: `${lado * 150}deg` }}
                />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
