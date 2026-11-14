import { useEffect, useState } from 'react';
import type { Lang } from '../data/perfil';

export type PrefTema = 'light' | 'dark' | 'system';

const leer = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const guardar = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* modo privado */ } };

const mq = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;

export function aplicarTema(pref: PrefTema) {
  document.documentElement.dataset.theme = pref === 'system' ? (mq?.matches ? 'dark' : 'light') : pref;
}

export function useTema() {
  const [pref, setPref] = useState<PrefTema>(() => (leer('tema') as PrefTema) || 'system');
  useEffect(() => {
    aplicarTema(pref); guardar('tema', pref);
    if (pref !== 'system' || !mq) return;
    const alCambiar = () => aplicarTema('system');
    mq.addEventListener('change', alCambiar);
    return () => mq.removeEventListener('change', alCambiar);
  }, [pref]);
  return [pref, setPref] as const;
}

export function useIdioma() {
  const [lang, setLang] = useState<Lang>(() => {
    const g = leer('idioma');
    if (g === 'es' || g === 'en') return g;
    return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
  });
  useEffect(() => { document.documentElement.lang = lang; guardar('idioma', lang); }, [lang]);
  return [lang, setLang] as const;
}
