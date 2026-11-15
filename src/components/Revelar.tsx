import { useEffect, useRef, useState, type ReactNode } from 'react';

export function useEnVista<T extends Element>(umbral = 0.15) {
  const ref = useRef<T>(null);
  const [dentro, setDentro] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setDentro(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDentro(true); io.disconnect(); } }, { threshold: umbral, rootMargin: '0px 0px -5% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [umbral]);
  return [ref, dentro] as const;
}

/** Aparece desde abajo al entrar en pantalla. Con «reducir movimiento» se ve de entrada (CSS). */
export function Revelar({ children, className = '', retraso = 0 }: { children: ReactNode; className?: string; retraso?: number }) {
  const [ref, dentro] = useEnVista<HTMLDivElement>(0.1);
  return <div ref={ref} style={{ transitionDelay: `${retraso}ms` }} className={`rev ${dentro ? 'rev-in' : ''} ${className}`}>{children}</div>;
}
