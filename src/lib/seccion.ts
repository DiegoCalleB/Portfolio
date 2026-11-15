import { useEffect, useState } from 'react';

/** Sección que cruza el centro de la pantalla. Al llegar al final de la página se queda con la última. */
export function useSeccionActiva(ids: readonly string[]) {
  const [activa, setActiva] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entradas) => { for (const e of entradas) if (e.isIntersecting) setActiva(e.target.id); },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    const alFinal = () => { if (innerHeight + scrollY >= document.documentElement.scrollHeight - 6) setActiva(ids[ids.length - 1]); };
    addEventListener('scroll', alFinal, { passive: true });
    return () => { io.disconnect(); removeEventListener('scroll', alFinal); };
  }, [ids]);
  return activa;
}
