import { useEffect, useState } from 'react';

/**
 * Acorde de bajo sintetizado con Web Audio (sin ficheros): quinta de La (A1 + E2 + A2),
 * ataque de púa y caída corta. Solo suena tras un clic del visitante y si tiene el sonido activo.
 */
let ctx: AudioContext | null = null;

const sonidoActivo = () => { try { return localStorage.getItem('sonido') !== 'no'; } catch { return true; } };

export function tocarAcorde() {
  if (!sonidoActivo() || typeof window === 'undefined' || !('AudioContext' in window)) return;
  ctx ??= new AudioContext();
  const t = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, t);
  master.gain.exponentialRampToValueAtTime(0.22, t + 0.012);
  master.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
  const filtro = ctx.createBiquadFilter();
  filtro.type = 'lowpass';
  filtro.frequency.setValueAtTime(1800, t);
  filtro.frequency.exponentialRampToValueAtTime(260, t + 0.9);
  filtro.connect(master).connect(ctx.destination);
  [55, 82.41, 110].forEach((f, i) => {
    const osc = ctx!.createOscillator();
    osc.type = i === 0 ? 'triangle' : 'sawtooth';
    osc.frequency.setValueAtTime(f, t + i * 0.025);
    const g = ctx!.createGain();
    g.gain.value = i === 0 ? 0.9 : 0.25;
    osc.connect(g).connect(filtro);
    osc.start(t + i * 0.025);
    osc.stop(t + 1.7);
  });
}

export function useSonido() {
  const [activo, setActivo] = useState(sonidoActivo);
  useEffect(() => { try { localStorage.setItem('sonido', activo ? 'si' : 'no'); } catch { /* modo privado */ } }, [activo]);
  return [activo, setActivo] as const;
}

/** Lanza el aplauso: el público se levanta y suena el acorde. */
export function celebrar() {
  tocarAcorde();
  window.dispatchEvent(new Event('publico:celebra'));
}
