import { useEffect, useRef } from 'react';
import { tocarAcorde } from '../lib/sonido';

const CLARO = ['#D86E31', '#E0615C', '#17998C', '#3C7EA8', '#9B5FB5'];
const OSCURO = ['#E99463', '#F08B84', '#4FC7B8', '#6FB0D9', '#C08FD6'];

/**
 * La Onda de Espectro a todo el ancho: barras de puntas redondeadas con un cabezal que recorre la pista
 * (como un reproductor). Reacciona al puntero y, al pulsar, lanza una onda con el acorde de bajo.
 * Se pausa fuera de pantalla y con «reducir movimiento» se dibuja quieta.
 */
export function OndaHeroe() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;
    const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0, enVista = true, cuadro = 0, inerte = '#E8EBEF';
    const ptr = { x: -9999, vivo: false };
    const pulso = { t: -99, x: 0 };

    const dibujar = (ms: number) => {
      const t = reducido ? 2.4 : ms / 1000;
      if (cuadro++ % 40 === 0) inerte = getComputedStyle(document.documentElement).getPropertyValue('--sunken').trim() || inerte;
      const pal = document.documentElement.dataset.theme === 'dark' ? OSCURO : CLARO;
      ctx.clearRect(0, 0, w, h);
      const paso = w < 520 ? 13 : 17, ancho = w < 520 ? 7 : 9;
      const n = Math.max(1, Math.floor(w / paso));
      const margen = (w - n * paso + (paso - ancho)) / 2;
      const cabeza = (t * 7) % n;
      for (let i = 0; i < n; i++) {
        const x = margen + i * paso, cx = x + ancho / 2;
        const env = 0.35 + 0.65 * Math.sin((Math.PI * (i + 0.5)) / n) ** 1.2;
        const base = 0.16 + 0.1 * Math.sin(i * 0.33 + t * 1.2) + 0.07 * Math.sin(i * 0.87 - t * 0.7);
        const dp = (cx - ptr.x) / 95;
        const toque = ptr.vivo ? Math.exp(-dp * dp) * 0.6 : 0;
        const edad = t - pulso.t;
        const dr = Math.abs(cx - pulso.x) - edad * 460;
        const onda = edad < 3 ? Math.exp(-(dr * dr) / 5000) * 0.65 * Math.exp(-edad * 1.1) : 0;
        const dc = Math.min(Math.abs(i - cabeza), n - Math.abs(i - cabeza));
        const luz = Math.max(0, 1 - dc / 4);
        const alto = Math.max(ancho, h * Math.min(1, base * env * 1.9 + toque + onda + luz * 0.12));
        const activo = Math.max(toque, onda * 1.4, luz);
        ctx.fillStyle = activo > 0.12 ? pal[Math.min(4, Math.floor((i / n) * 5))] : inerte;
        ctx.globalAlpha = activo > 0.12 ? Math.min(1, 0.45 + activo) : 1;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x, h - alto, ancho, alto, ancho / 2); else ctx.rect(x, h - alto, ancho, alto);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    const bucle = (ms: number) => { dibujar(ms); raf = enVista && !document.hidden ? requestAnimationFrame(bucle) : 0; };
    const arrancar = () => { if (!reducido && !raf) raf = requestAnimationFrame(bucle); };

    const ajustar = () => {
      const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reducido) dibujar(0);
    };
    const local = (e: PointerEvent) => e.clientX - cv.getBoundingClientRect().left;
    const mover = (e: PointerEvent) => { ptr.x = local(e); ptr.vivo = true; };
    const salir = () => { ptr.vivo = false; };
    const pulsar = (e: PointerEvent) => { pulso.t = performance.now() / 1000; pulso.x = local(e); tocarAcorde(); };
    const visible = () => { if (!document.hidden) arrancar(); };

    const ro = new ResizeObserver(ajustar); ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { enVista = e.isIntersecting; if (enVista) arrancar(); }); io.observe(cv);
    cv.addEventListener('pointermove', mover); cv.addEventListener('pointerleave', salir); cv.addEventListener('pointerdown', pulsar);
    document.addEventListener('visibilitychange', visible);
    ajustar(); arrancar();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      cv.removeEventListener('pointermove', mover); cv.removeEventListener('pointerleave', salir); cv.removeEventListener('pointerdown', pulsar);
      document.removeEventListener('visibilitychange', visible);
    };
  }, []);
  return <canvas ref={ref} aria-hidden className="block h-28 w-full cursor-pointer sm:h-36" style={{ touchAction: 'pan-y' }} />;
}
